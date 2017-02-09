requirejs.config({
	// baseUrl:'js',
    paths : {
    	// 别名
        "jquery": "jquery-3.1.1",
        "register":'register',
        "login":'login',
        "goods":'goods',
        //"goodlist":'goodlist',
        //"cart":'shopping-cart',
        "homepage":'homepage',
        "carousel":'../assets/jquery-Carousel/jquery-Carousel',
        "countdown":'../assets/jquery-Countdown/jquey-Countdown',
        "zoom":'../assets/jquery-gdszoom/jquery.gdszoom',
        "shuffling":'../assets/jquery-Shuffling/ShufflingFigure'
    },
    shim:{
    	"carousel":{
            deps: ["jquery"],
    		exports:'jQuery.fn.Carousel'
    	},
    	"countdown":{
            deps: ["jquery"],
            exports:'jQuery.fn.Countdowm'
        },
        "zoom":{
            deps: ["jquery"],
            exports:'jQuery.fn.gdszoom'
        },
        "shuffling":{
            deps: ["jquery"],
            exports:'jQuery.fn.shuffling'
        }
    },
    //waitSeconds: 0
});
