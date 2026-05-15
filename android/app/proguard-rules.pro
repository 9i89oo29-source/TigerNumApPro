# Retrofit
-keepattributes Signature
-keepattributes *Annotation*
-keep class com.tigernum.app.data.remote.** { *; }
-keepclassmembers class com.tigernum.app.data.remote.dto.** { *; }

# Gson
-keep class com.google.gson.** { *; }
-keep class * extends com.google.gson.TypeAdapter
-keep class * implements com.google.gson.TypeAdapterFactory
-keep class * implements com.google.gson.JsonSerializer
-keep class * implements com.google.gson.JsonDeserializer

# Room
-keep class * extends androidx.room.RoomDatabase
-dontwarn androidx.room.paging.**
-keepclassmembers class com.tigernum.app.data.local.entity.** { *; }

# OkHttp
-dontwarn okhttp3.**
-dontwarn okio.**

# Hilt
-keep class dagger.hilt.** { *; }
-keep class javax.inject.** { *; }
-dontwarn dagger.hilt.**

# Timber
-dontwarn org.jetbrains.annotations.**

# Firebase
-keep class com.google.firebase.** { *; }
