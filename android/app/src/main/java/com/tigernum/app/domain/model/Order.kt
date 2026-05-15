package com.tigernum.app.domain.model

data class Order(
    val orderId: String,
    val number: String,
    val service: String,
    val country: String,
    val factory: String,
    val smsCode: String?,
    val status: String
)
