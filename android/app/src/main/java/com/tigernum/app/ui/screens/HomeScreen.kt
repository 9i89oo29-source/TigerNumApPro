package com.tigernum.app.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavHostController
import com.tigernum.app.R
import com.tigernum.app.viewmodel.HomeViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(navController: NavHostController, viewModel: HomeViewModel = hiltViewModel()) {
    val uiState by viewModel.uiState.collectAsState()

    // التنقل إلى شاشة الرقم عند نجاح الشراء
    LaunchedEffect(uiState.buySuccess) {
        uiState.buySuccess?.let { (orderId, number) ->
            navController.navigate("buy_number/$orderId/$number")
            viewModel.resetBuySuccess()
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // عرض الرصيد
        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primary)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(stringResource(R.string.balance_label), color = MaterialTheme.colorScheme.onPrimary)
                Text(
                    text = "${uiState.balance} ${uiState.currency}",
                    color = MaterialTheme.colorScheme.onPrimary,
                    style = MaterialTheme.typography.headlineSmall
                )
            }
        }

        // اختيار المصنع
        var expandedFactory by remember { mutableStateOf(false) }
        ExposedDropdownMenuBox(
            expanded = expandedFactory,
            onExpandedChange = { expandedFactory = !expandedFactory }
        ) {
            OutlinedTextField(
                value = uiState.selectedFactory,
                onValueChange = {},
                readOnly = true,
                label = { Text(stringResource(R.string.factory_label)) },
                trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = expandedFactory) },
                modifier = Modifier.fillMaxWidth().menuAnchor()
            )
            ExposedDropdownMenu(expanded = expandedFactory, onDismissRequest = { expandedFactory = false }) {
                uiState.factories.forEach { factory ->
                    DropdownMenuItem(
                        text = { Text(factory) },
                        onClick = {
                            viewModel.onFactorySelected(factory)
                            expandedFactory = false
                        }
                    )
                }
            }
        }

        // اختيار الدولة
        var expandedCountry by remember { mutableStateOf(false) }
        ExposedDropdownMenuBox(
            expanded = expandedCountry,
            onExpandedChange = { expandedCountry = !expandedCountry }
        ) {
            OutlinedTextField(
                value = uiState.selectedCountry?.let { "${it.flag} ${it.name} (${it.dialCode})" } ?: "",
                onValueChange = {},
                readOnly = true,
                label = { Text(stringResource(R.string.country_label)) },
                trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = expandedCountry) },
                modifier = Modifier.fillMaxWidth().menuAnchor()
            )
            ExposedDropdownMenu(expanded = expandedCountry, onDismissRequest = { expandedCountry = false }) {
                uiState.countries.forEach { country ->
                    DropdownMenuItem(
                        text = { Text("${country.flag} ${country.name} (${country.dialCode})") },
                        onClick = {
                            viewModel.onCountrySelected(country)
                            expandedCountry = false
                        }
                    )
                }
            }
        }

        // اختيار الخدمة
        var expandedService by remember { mutableStateOf(false) }
        ExposedDropdownMenuBox(
            expanded = expandedService,
            onExpandedChange = { expandedService = !expandedService }
        ) {
            OutlinedTextField(
                value = uiState.selectedService,
                onValueChange = {},
                readOnly = true,
                label = { Text(stringResource(R.string.service_label)) },
                trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = expandedService) },
                modifier = Modifier.fillMaxWidth().menuAnchor()
            )
            ExposedDropdownMenu(expanded = expandedService, onDismissRequest = { expandedService = false }) {
                uiState.services.forEach { service ->
                    DropdownMenuItem(
                        text = { Text(service.name) },
                        onClick = {
                            viewModel.onServiceSelected(service.id)
                            expandedService = false
                        }
                    )
                }
            }
        }

        // زر الشراء
        Button(
            onClick = { viewModel.buyNumber() },
            enabled = !uiState.isLoading && uiState.selectedCountry != null && uiState.selectedService.isNotEmpty(),
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(stringResource(R.string.buy_button))
        }

        if (uiState.isLoading) {
            CircularProgressIndicator(modifier = Modifier.align(Alignment.CenterHorizontally))
        }

        uiState.errorMessage?.let {
            Text(it, color = MaterialTheme.colorScheme.error)
        }
    }
}
