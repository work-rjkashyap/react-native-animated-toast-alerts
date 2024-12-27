package com.animatedtoastalerts;

import android.view.View;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

public class AnimatedToastAlertsManager extends SimpleViewManager<View> {
    @Override
    public String getName() {
        return "AnimatedToastAlerts";
    }

    @Override
    protected View createViewInstance(ThemedReactContext reactContext) {
        return new View(reactContext);
    }
}
