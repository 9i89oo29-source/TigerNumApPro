package com.tigernum.app.data.local.dao

import androidx.room.*
import com.tigernum.app.data.local.entity.OrderEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface OrderDao {
    @Query("SELECT * FROM orders ORDER BY createdAt DESC")
    fun getAllOrders(): Flow<List<OrderEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insert(order: OrderEntity)

    @Query("UPDATE orders SET smsCode = :code, status = :status WHERE orderId = :orderId")
    suspend fun updateSmsCode(orderId: String, code: String, status: String)

    @Query("DELETE FROM orders")
    suspend fun deleteAll()
}
