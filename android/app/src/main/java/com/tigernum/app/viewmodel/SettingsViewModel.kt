package com.tigernum.app.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.tigernum.app.data.repository.TigerRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

data class SettingsUiState(
    val name: String = "",
    val email: String = "",
    val phone: String = "",
    val loggedOut: Boolean = false
)

@HiltViewModel
class SettingsViewModel @Inject constructor(
    private val repository: TigerRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow(SettingsUiState())
    val uiState: StateFlow<SettingsUiState> = _uiState

    init {
        _uiState.value = SettingsUiState(
            name = repository.getUserName(),
            email = repository.getUserEmail(),
            phone = repository.getUserPhone()
        )
    }

    fun logout() {
        repository.logout()
        _uiState.value = _uiState.value.copy(loggedOut = true)
    }
}
