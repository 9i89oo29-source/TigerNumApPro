package com.tigernum.app.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.tigernum.app.data.repository.TigerRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

data class RegisterUiState(
    val isLoading: Boolean = false,
    val errorMessage: String? = null,
    val registrationSuccess: Boolean = false
)

@HiltViewModel
class RegisterViewModel @Inject constructor(
    private val repository: TigerRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow(RegisterUiState())
    val uiState: StateFlow<RegisterUiState> = _uiState

    fun register(name: String, email: String, phone: String) {
        if (name.isBlank() || email.isBlank() || phone.isBlank()) {
            _uiState.value = _uiState.value.copy(errorMessage = "جميع الحقول مطلوبة")
            return
        }
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true, errorMessage = null)
            val result = repository.register(name, email, phone)
            result.onSuccess {
                _uiState.value = _uiState.value.copy(isLoading = false, registrationSuccess = true)
            }.onFailure {
                _uiState.value = _uiState.value.copy(isLoading = false, errorMessage = it.message ?: "فشل التسجيل")
            }
        }
    }
}
