! function() {
    "use strict";
    angular.module("awlert", [])
}(),
function() {
    "use strict";
    angular.module("awlert").constant("AWLERT_TYPES", {
        ERROR: "assertive-bg",
        SUCCESS: "balanced-bg",
        NEUTRAL: "positive-bg",
        CUSTOM: ""
    })
}(),
function() {
    "use strict";

    function t(t) {
        function e(e, r) {
            function a() {
                r.addClass(e.type), r.bind("click", i), t(function() {
                    r.addClass("enter"), e.duration != -1 && c()
                }, 30)
            }

            function i() {
                e.$emit("awlert:click", e)
            }

            function c() {
                t(function() {
                    r.removeClass("enter"), t(function() {
                        r.remove(), e.$destroy()
                    }, n)
                }, e.duration || 3e3)
            }
            e.$parent.remove = c, a()
        }
        var n = 600;
        return {
            template: '<div class="awlert"><div class="space"></div><div class="content">{{message}}</div></div>',
            replace: "true",
            restrict: "E",
            scope: !0,
            link: e
        }
    }
    angular.module("awlert").directive("awLert", t), t.$inject = ["$timeout"]
}(),
function() {
    "use strict";

    function t(t, e, n, r) {
        function a(t, e) {
            return u(t, e, r.NEUTRAL)
        }

        function i(t, e) {
            return u(t, e, r.ERROR)
        }

        function c(t, e) {
            return u(t, e, r.SUCCESS)
        }

        function u(t, e, r) {
            var a = n.$new(!0);
            return angular.extend(a, {
                message: t,
                duration: e,
                type: r
            }), o(a), a
        }

        function o(n) {
            var r = t("<aw-lert></aw-lert>")(n);
            e[0].body.appendChild(r[0])
        }
        return {
            error: i,
            success: c,
            neutral: a
        }
    }
    angular.module("awlert").factory("awlert", t), t.$inject = ["$compile", "$document", "$rootScope", "AWLERT_TYPES"]
}();