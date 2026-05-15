package com.tigernum.app.data.remote

import java.io.InputStream
import java.security.KeyStore
import java.security.cert.CertificateFactory
import java.security.cert.X509Certificate
import javax.net.ssl.TrustManagerFactory
import javax.net.ssl.X509TrustManager

object SslPinning {

    fun getTrustManager(): X509TrustManager {
        val cf = CertificateFactory.getInstance("X.509")
        // في التطبيق الحقيقي، قم بتحميل شهادة الخادم من raw resource
        // هنا لأغراض العرض نستخدم trust manager افتراضي
        val trustManagerFactory = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm())
        trustManagerFactory.init(null as KeyStore?)
        return trustManagerFactory.trustManagers.first() as X509TrustManager
    }
}
