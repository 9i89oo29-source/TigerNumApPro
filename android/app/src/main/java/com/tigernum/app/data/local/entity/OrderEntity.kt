package com.tigernum.app.data.local.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "orders")
data class OrderEntity(
    @PrimaryKey val orderId: String,
    val number: String,
    val service: String,
    val country: String,
    val factory: String,
    val smsCode: String?,
    val status: String, // pending, completed, cancelled
    val createdAt: Long
)
