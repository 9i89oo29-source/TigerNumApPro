package com.tigernum.app.ui.screens

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavHostController
import com.tigernum.app.R
import com.tigernum.app.viewmodel.BuyNumberViewModel

@Composable
fun BuyNumberScreen(
    orderId: String,
    number: String,
    navController: NavHostController,
    viewModel: BuyNumberViewModel = hiltViewModel()
) {
    val context = LocalContext.current
    val uiState by viewModel.uiState.collectAsState()

    LaunchedEffect(orderId) {
        viewModel.initialize(orderId, number)
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text(stringResource(R.string.buy_number_title), style = MaterialTheme.typography.headlineSmall)
        Text(uiState.number, style = MaterialTheme.typography.headlineLarge)
        Button(onClick = {
            val clipboard = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
            clipboard.setPrimaryClip(ClipData.newPlainText("number", uiState.number))
        }) {
            Text(stringResource(R.string.copy_number))
        }

        Spacer(modifier = Modifier.height(24.dp))
        if (uiState.isWaiting) {
            CircularProgressIndicator()
            Text(stringResource(R.string.waiting_sms))
        } else if (uiState.smsCode != null) {
            Text(stringResource(R.string.sms_received), color = MaterialTheme.colorScheme.primary)
            Text(uiState.smsCode!!, style = MaterialTheme.typography.displaySmall)
        } else if (uiState.errorMessage != null) {
            Text(uiState.errorMessage!!, color = MaterialTheme.colorScheme.error)
        }

        Spacer(modifier = Modifier.height(32.dp))
        OutlinedButton(onClick = { navController.popBackStack() }) {
            Text(stringResource(R.string.back_button))
        }
    }
}
