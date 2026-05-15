package com.tigernum.app.data.remote.dto

data class BuyRequest(
    val factory: String,
    val country: String,
    val service: String
)

data class BuyResponseDto(
    val orderId: String,
    val number: String,
    val price: Double,
    val currency: String
)

data class SmsCodeResponseDto(
    val code: String?,
    val status: String
)
