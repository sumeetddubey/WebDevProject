/**
 * Created by sumeetdubey on 3/10/16.
 */
(function(){
    var app = angular.module('codingTutorial',
        ['ngRoute',
            'ngMaterial',
            'chart.js',
            'md.data.table',
            'flow',
            'ngYoutubeEmbed',
            'textAngular',
            'ng-mfb',
            'textAngular',
            'ui.ace',
            'ngStorage'])
        .config(function($mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('yellow', {
                    'default': '900'
                })
                .accentPalette('pink')
                .warnPalette('red')
                .backgroundPalette('grey');
        });
})();
