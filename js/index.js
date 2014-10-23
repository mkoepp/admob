/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        navigator.splashscreen.hide();
        
        if (window.plugins && window.plugins.AdMob) {
            var admob_ios_key = 'ca-app-pub-1882245665150742/5173927112';
            var admob_android_key = 'ca-app-pub-1882245665150742/7348664319';
            var adId = (navigator.userAgent.indexOf('Android') >= 0) ? admob_android_key : admob_ios_key;
            var am = window.plugins.AdMob;
            am.createBannerView({
                                    'publisherId': adId,
                                    'adSize': am.AD_SIZE.BANNER,
                                    'bannerAtTop': false
                                }, 
                                function() {
                                    am.requestAd(
                                        { 'isTesting':true }, 
                                        function() {
                                            am.showAd(true);
                                        }, 
                                        function() {
                                            alert('failed to request ad');
                                        }
                                        );
                                }, 
                                function() {
                                    alert('failed to create banner view');
                                }
                );
        } else {
            alert('AdMob plugin not available/ready.');
        }
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};