package com.tigernum.app.data.local

import android.content.Context
import android.content.SharedPreferences
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKeys

class SessionManager(context: Context) {

    private val masterKeyAlias = MasterKeys.getOrCreate(MasterKeys.AES256_GCM_SPEC)

    private val prefs: SharedPreferences = EncryptedSharedPreferences.create(
        "tiger_secure_prefs",
        masterKeyAlias,
        context,
        EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
        EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
    )

    companion object {
        private const val KEY_UUID = "user_uuid"
        private const val KEY_NAME = "user_name"
        private const val KEY_EMAIL = "user_email"
        private const val KEY_PHONE = "user_phone"
        private const val KEY_BALANCE = "user_balance"
        private const val KEY_CURRENCY = "user_currency"
    }

    fun saveUser(uuid: String, name: String, email: String, phone: String) {
        prefs.edit()
            .putString(KEY_UUID, uuid)
            .putString(KEY_NAME, name)
            .putString(KEY_EMAIL, email)
            .putString(KEY_PHONE, phone)
            .apply()
    }

    fun getUuid(): String? = prefs.getString(KEY_UUID, null)
    fun getUserName(): String = prefs.getString(KEY_NAME, "") ?: ""
    fun getUserEmail(): String = prefs.getString(KEY_EMAIL, "") ?: ""
    fun getUserPhone(): String = prefs.getString(KEY_PHONE, "") ?: ""

    fun setBalance(balance: Double, currency: String) {
        prefs.edit()
            .putString(KEY_CURRENCY, currency)
            .putLong(KEY_BALANCE, java.lang.Double.doubleToRawLongBits(balance))
            .apply()
    }

    fun getBalance(): Double {
        return java.lang.Double.longBitsToDouble(
            prefs.getLong(KEY_BALANCE, java.lang.Double.doubleToRawLongBits(0.0))
        )
    }

    fun getCurrency(): String = prefs.getString(KEY_CURRENCY, "USD") ?: "USD"

    fun clear() {
        prefs.edit().clear().apply()
    }
}
