package com.tigernum.app.di

import com.tigernum.app.data.local.SessionManager
import com.tigernum.app.data.local.dao.CountryDao
import com.tigernum.app.data.local.dao.OrderDao
import com.tigernum.app.data.local.dao.ServiceDao
import com.tigernum.app.data.remote.ApiService
import com.tigernum.app.data.repository.TigerRepository
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object RepositoryModule {

    @Provides
    @Singleton
    fun provideTigerRepository(
        apiService: ApiService,
        sessionManager: SessionManager,
        countryDao: CountryDao,
        serviceDao: ServiceDao,
        orderDao: OrderDao
    ): TigerRepository {
        return TigerRepository(apiService, sessionManager, countryDao, serviceDao, orderDao)
    }
}
