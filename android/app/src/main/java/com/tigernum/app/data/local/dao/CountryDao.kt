package com.tigernum.app.data.local.dao

import androidx.room.*
import com.tigernum.app.data.local.entity.CountryEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface CountryDao {
    @Query("SELECT * FROM countries")
    fun getAllCountries(): Flow<List<CountryEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAll(countries: List<CountryEntity>)

    @Query("DELETE FROM countries")
    suspend fun deleteAll()
}
