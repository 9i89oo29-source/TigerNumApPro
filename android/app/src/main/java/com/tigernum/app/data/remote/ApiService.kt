package com.tigernum.app.data.remote

import com.tigernum.app.data.remote.dto.*
import retrofit2.http.*

interface ApiService {
    @POST("api/auth/register")
    suspend fun register(@Body request: RegisterRequest): RegisterResponse

    @GET("api/user/profile")
    suspend fun getProfile(@Header("Authorization") uuid: String): UserProfileResponse

    @GET("api/meta/countries")
    suspend fun getCountries(): List<CountryDto>

    @GET("api/meta/services")
    suspend fun getServices(): List<ServiceDto>

    @GET("api/user/balance")
    suspend fun getBalance(@Header("Authorization") uuid: String): BalanceDto

    @POST("api/buy/number")
    suspend fun buyNumber(
        @Header("Authorization") uuid: String,
        @Body request: BuyRequest
    ): BuyResponseDto

    @GET("api/buy/code/{orderId}")
    suspend fun getSmsCode(
        @Header("Authorization") uuid: String,
        @Path("orderId") orderId: String
    ): SmsCodeResponseDto
}
