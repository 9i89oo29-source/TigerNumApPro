package com.tigernum.app

import android.app.Application
import dagger.hilt.android.HiltAndroidApp
import com.google.firebase.crashlytics.FirebaseCrashlytics
import timber.log.Timber

@HiltAndroidApp
class TigerNumApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        instance = this
        if (BuildConfig.DEBUG) {
            Timber.plant(Timber.DebugTree())
        }
        FirebaseCrashlytics.getInstance().setCrashlyticsCollectionEnabled(!BuildConfig.DEBUG)
    }

    companion object {
        lateinit var instance: TigerNumApplication
            private set
    }
}
