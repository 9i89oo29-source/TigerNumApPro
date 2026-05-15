package com.tigernum.app.data.local

import androidx.room.Database
import androidx.room.RoomDatabase
import com.tigernum.app.data.local.dao.CountryDao
import com.tigernum.app.data.local.dao.OrderDao
import com.tigernum.app.data.local.dao.ServiceDao
import com.tigernum.app.data.local.entity.CountryEntity
import com.tigernum.app.data.local.entity.OrderEntity
import com.tigernum.app.data.local.entity.ServiceEntity

@Database(entities = [CountryEntity::class, ServiceEntity::class, OrderEntity::class], version = 1, exportSchema = false)
abstract class AppDatabase : RoomDatabase() {
    abstract fun countryDao(): CountryDao
    abstract fun serviceDao(): ServiceDao
    abstract fun orderDao(): OrderDao
}
