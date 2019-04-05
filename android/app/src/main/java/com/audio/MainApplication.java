package com.audio;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.johnsonsu.rnsoundplayer.RNSoundPlayerPackage;
import com.goodatlas.audiorecord.RNAudioRecordPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNGestureHandlerPackage(),
            new SplashScreenReactPackage(),
            new RNSoundPackage(),
            new RNSoundPlayerPackage(),
            new RNAudioRecordPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    getValidSampleRates();
    SoLoader.init(this, /* native exopackage */ false);
  }



  public void getValidSampleRates() {
    // for (int rate : new int[] {44100, 22050, 11025, 16000, 8000}) {  // add the rates you wish to check against
    //     int bufferSize = AudioRecord.getMinBufferSize(rate, AudioFormat.CHANNEL_CONFIGURATION_DEFAULT, AudioFormat.ENCODING_PCM_16BIT);
    //     if (bufferSize > 0) {
    //         // buffer size is valid, Sample rate supported

    //     }
    // }
}
}
