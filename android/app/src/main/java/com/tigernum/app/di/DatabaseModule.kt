package com.tigernum.app.di

import android.content.Context
import androidx.room.Room
import com.tigernum.app.data.local.AppDatabase
import com.tigernum.app.data.local.dao.CountryDao
import com.tigernum.app.data.local.dao.OrderDao
import com.tigernum.app.data.local.dao.ServiceDao
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object DatabaseModule {

    @Provides
    @Singleton
    fun provideDatabase(@ApplicationContext context: Context): AppDatabase {
        return Room.databaseBuilder(
            context,
            AppDatabase::class.java,
            "tigernum_db"
        ).fallbackToDestructiveMigration().build()
    }

    @Provides
    fun provideCountryDao(db: AppDatabase): CountryDao = db.countryDao()

    @Provides
    fun provideServiceDao(db: AppDatabase): ServiceDao = db.serviceDao()

    @Provides
    fun provideOrderDao(db: AppDatabase): OrderDao = db.orderDao()
}
