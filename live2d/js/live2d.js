"use strict";
!function(t) {
    function i(r) {
        if (e[r])
            return e[r].exports;
        var o = e[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return t[r].call(o.exports, o, o.exports, i),
        o.l = !0,
        o.exports
    }
    var e = {};
    i.m = t,
    i.c = e,
    i.d = function(t, e, r) {
        i.o(t, e) || Object.defineProperty(t, e, {
            configurable: !1,
            enumerable: !0,
            get: r
        })
    }
    ,
    i.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        }
        : function() {
            return t
        }
        ;
        return i.d(e, "a", e),
        e
    }
    ,
    i.o = function(t, i) {
        return Object.prototype.hasOwnProperty.call(t, i)
    }
    ,
    i.p = "",
    i(i.s = 4)
}([function(t, i, e) {
    function r() {
        this.live2DModel = null,
        this.modelMatrix = null,
        this.eyeBlink = null,
        this.physics = null,
        this.pose = null,
        this.debugMode = !1,
        this.initialized = !1,
        this.updating = !1,
        this.alpha = 1,
        this.accAlpha = 0,
        this.lipSync = !1,
        this.lipSyncValue = 0,
        this.accelX = 0,
        this.accelY = 0,
        this.accelZ = 0,
        this.dragX = 0,
        this.dragY = 0,
        this.startTimeMSec = null,
        this.mainMotionManager = new h,
        this.expressionManager = new h,
        this.motions = {},
        this.expressions = {},
        this.isTexLoaded = !1
    }
    function o() {
        AMotion.prototype.constructor.call(this),
        this.paramList = new Array
    }
    function n() {
        this.id = "",
        this.type = -1,
        this.value = null
    }
    function s() {
        this.nextBlinkTime = null,
        this.stateStartTime = null,
        this.blinkIntervalMsec = null,
        this.eyeState = g.STATE_FIRST,
        this.blinkIntervalMsec = 4e3,
        this.closingMotionMsec = 100,
        this.closedMotionMsec = 50,
        this.openingMotionMsec = 150,
        this.closeIfZero = !0,
        this.eyeID_L = "PARAM_EYE_L_OPEN",
        this.eyeID_R = "PARAM_EYE_R_OPEN"
    }
    function _() {
        this.tr = new Float32Array(16),
        this.identity()
    }
    function a(t, i) {
        _.prototype.constructor.call(this),
        this.width = t,
        this.height = i
    }
    function h() {
        MotionQueueManager.prototype.constructor.call(this),
        this.currentPriority = null,
        this.reservePriority = null,
        this.super = MotionQueueManager.prototype
    }
    function l() {
        this.physicsList = new Array,
        this.startTimeMSec = UtSystem.getUserTimeMSec()
    }
    function $() {
        this.lastTime = 0,
        this.lastModel = null,
        this.partsGroups = new Array
    }
    function u(t) {
        this.paramIndex = -1,
        this.partsIndex = -1,
        this.link = null,
        this.id = t
    }
    function p() {
        this.EPSILON = .01,
        this.faceTargetX = 0,
        this.faceTargetY = 0,
        this.faceX = 0,
        this.faceY = 0,
        this.faceVX = 0,
        this.faceVY = 0,
        this.lastTimeSec = 0
    }
    function f() {
        _.prototype.constructor.call(this),
        this.screenLeft = null,
        this.screenRight = null,
        this.screenTop = null,
        this.screenBottom = null,
        this.maxLeft = null,
        this.maxRight = null,
        this.maxTop = null,
        this.maxBottom = null,
        this.max = Number.MAX_VALUE,
        this.min = 0
    }
    function c() {}
    var d = 0;
    r.prototype.getModelMatrix = function() {
        return this.modelMatrix
    }
    ,
    r.prototype.setAlpha = function(t) {
        t > .999 && (t = 1),
        t < .001 && (t = 0),
        this.alpha = t
    }
    ,
    r.prototype.getAlpha = function() {
        return this.alpha
    }
    ,
    r.prototype.isInitialized = function() {
        return this.initialized
    }
    ,
    r.prototype.setInitialized = function(t) {
        this.initialized = t
    }
    ,
    r.prototype.isUpdating = function() {
        return this.updating
    }
    ,
    r.prototype.setUpdating = function(t) {
        this.updating = t
    }
    ,
    r.prototype.getLive2DModel = function() {
        return this.live2DModel
    }
    ,
    r.prototype.setLipSync = function(t) {
        this.lipSync = t
    }
    ,
    r.prototype.setLipSyncValue = function(t) {
        this.lipSyncValue = t
    }
    ,
    r.prototype.setAccel = function(t, i, e) {
        this.accelX = t,
        this.accelY = i,
        this.accelZ = e
    }
    ,
    r.prototype.setDrag = function(t, i) {
        this.dragX = t,
        this.dragY = i
    }
    ,
    r.prototype.getMainMotionManager = function() {
        return this.mainMotionManager
    }
    ,
    r.prototype.getExpressionManager = function() {
        return this.expressionManager
    }
    ,
    r.prototype.loadModelData = function(t, i) {
        var e = c.getPlatformManager();
        this.debugMode && e.log("Load model : " + t);
        var r = this;
        e.loadLive2DModel(t, function(t) {
            r.live2DModel = t,
            r.live2DModel.saveParam(),
            0 == Live2D.getError() ? (r.modelMatrix = new a(r.live2DModel.getCanvasWidth(),r.live2DModel.getCanvasHeight()),
            r.modelMatrix.setWidth(2),
            r.modelMatrix.setCenterPosition(0, 0),
            i(r.live2DModel)) : console.error("Error : Failed to loadModelData().")
        })
    }
    ,
    r.prototype.loadTexture = function(t, i, e) {
        d++;
        var r = c.getPlatformManager();
        this.debugMode && r.log("Load Texture : " + i);
        var o = this;
        r.loadTexture(this.live2DModel, t, i, function() {
            0 == --d && (o.isTexLoaded = !0),
            "function" == typeof e && e()
        })
    }
    ,
    r.prototype.loadMotion = function(t, i, e) {
        var r = c.getPlatformManager();
        this.debugMode && r.log("Load Motion : " + i);
        var o = null
          , n = this;
        r.loadBytes(i, function(i) {
            o = Live2DMotion.loadMotion(i),
            null != t && (n.motions[t] = o),
            e(o)
        })
    }
    ,
    r.prototype.loadExpression = function(t, i, e) {
        var r = c.getPlatformManager();
        this.debugMode && r.log("Load Expression : " + i);
        var n = this;
        r.loadBytes(i, function(i) {
            null != t && (n.expressions[t] = o.loadJson(i)),
            "function" == typeof e && e()
        })
    }
    ,
    r.prototype.loadPose = function(t, i) {
        var e = c.getPlatformManager();
        this.debugMode && e.log("Load Pose : " + t);
        var r = this;
        try {
            e.loadBytes(t, function(t) {
                r.pose = $.load(t),
                "function" == typeof i && i()
            })
        } catch (t) {
            console.warn(t)
        }
    }
    ,
    r.prototype.loadPhysics = function(t) {
        var i = c.getPlatformManager();
        this.debugMode && i.log("Load Physics : " + t);
        var e = this;
        try {
            i.loadBytes(t, function(t) {
                e.physics = l.load(t)
            })
        } catch (t) {
            console.warn(t)
        }
    }
    ,
    r.prototype.hitTestSimple = function(t, i, e) {
        if (null === this.live2DModel)
            return !1;
        var r = this.live2DModel.getDrawDataIndex(t);
        if (r < 0)
            return !1;
        for (var o = this.live2DModel.getTransformedPoints(r), n = this.live2DModel.getCanvasWidth(), s = 0, _ = this.live2DModel.getCanvasHeight(), a = 0, h = 0; h < o.length; h += 2) {
            var l = o[h]
              , $ = o[h + 1];
            l < n && (n = l),
            l > s && (s = l),
            $ < _ && (_ = $),
            $ > a && (a = $)
        }
        var u = this.modelMatrix.invertTransformX(i)
          , p = this.modelMatrix.invertTransformY(e);
        return n <= u && u <= s && _ <= p && p <= a
    }
    ,
    r.prototype.hitTestSimpleCustom = function(t, i, e, r) {
        return null !== this.live2DModel && e >= t[0] && e <= i[0] && r <= t[1] && r >= i[1]
    }
    ,
    o.prototype = new AMotion,
    o.EXPRESSION_DEFAULT = "DEFAULT",
    o.TYPE_SET = 0,
    o.TYPE_ADD = 1,
    o.TYPE_MULT = 2,
    o.loadJson = function(t) {
        var i = new o
          , e = c.getPlatformManager().jsonParseFromBytes(t);
        if (i.setFadeIn(parseInt(e.fade_in) > 0 ? parseInt(e.fade_in) : 1e3),
        i.setFadeOut(parseInt(e.fade_out) > 0 ? parseInt(e.fade_out) : 1e3),
        null == e.params)
            return i;
        var r = e.params
          , s = r.length;
        i.paramList = [];
        for (var _ = 0; _ < s; _++) {
            var a = r[_]
              , h = a.id.toString()
              , l = parseFloat(a.val)
              , $ = o.TYPE_ADD
              , u = null != a.calc ? a.calc.toString() : "add";
            if (($ = "add" === u ? o.TYPE_ADD : "mult" === u ? o.TYPE_MULT : "set" === u ? o.TYPE_SET : o.TYPE_ADD) == o.TYPE_ADD)
                l -= p = null == a.def ? 0 : parseFloat(a.def);
            else if ($ == o.TYPE_MULT) {
                var p = null == a.def ? 1 : parseFloat(a.def);
                0 == p && (p = 1),
                l /= p
            }
            var f = new n;
            f.id = h,
            f.type = $,
            f.value = l,
            i.paramList.push(f)
        }
        return i
    }
    ,
    o.prototype.updateParamExe = function(t, i, e, r) {
        for (var n = this.paramList.length - 1; n >= 0; --n) {
            var s = this.paramList[n];
            s.type == o.TYPE_ADD ? t.addToParamFloat(s.id, s.value, e) : s.type == o.TYPE_MULT ? t.multParamFloat(s.id, s.value, e) : s.type == o.TYPE_SET && t.setParamFloat(s.id, s.value, e)
        }
    }
    ,
    s.prototype.calcNextBlink = function() {
        return UtSystem.getUserTimeMSec() + Math.random() * (2 * this.blinkIntervalMsec - 1)
    }
    ,
    s.prototype.setInterval = function(t) {
        this.blinkIntervalMsec = t
    }
    ,
    s.prototype.setEyeMotion = function(t, i, e) {
        this.closingMotionMsec = t,
        this.closedMotionMsec = i,
        this.openingMotionMsec = e
    }
    ,
    s.prototype.updateParam = function(t) {
        var i, e = UtSystem.getUserTimeMSec(), r = 0;
        switch (this.eyeState) {
        case g.STATE_CLOSING:
            (r = (e - this.stateStartTime) / this.closingMotionMsec) >= 1 && (r = 1,
            this.eyeState = g.STATE_CLOSED,
            this.stateStartTime = e),
            i = 1 - r;
            break;
        case g.STATE_CLOSED:
            (r = (e - this.stateStartTime) / this.closedMotionMsec) >= 1 && (this.eyeState = g.STATE_OPENING,
            this.stateStartTime = e),
            i = 0;
            break;
        case g.STATE_OPENING:
            (r = (e - this.stateStartTime) / this.openingMotionMsec) >= 1 && (r = 1,
            this.eyeState = g.STATE_INTERVAL,
            this.nextBlinkTime = this.calcNextBlink()),
            i = r;
            break;
        case g.STATE_INTERVAL:
            this.nextBlinkTime < e && (this.eyeState = g.STATE_CLOSING,
            this.stateStartTime = e),
            i = 1;
            break;
        case g.STATE_FIRST:
        default:
            this.eyeState = g.STATE_INTERVAL,
            this.nextBlinkTime = this.calcNextBlink(),
            i = 1
        }
        this.closeIfZero || (i = -i),
        t.setParamFloat(this.eyeID_L, i),
        t.setParamFloat(this.eyeID_R, i)
    }
    ;
    var g = function() {};
    g.STATE_FIRST = "STATE_FIRST",
    g.STATE_INTERVAL = "STATE_INTERVAL",
    g.STATE_CLOSING = "STATE_CLOSING",
    g.STATE_CLOSED = "STATE_CLOSED",
    g.STATE_OPENING = "STATE_OPENING",
    _.mul = function(t, i, e) {
        var r, o, n, s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (r = 0; r < 4; r++)
            for (o = 0; o < 4; o++)
                for (n = 0; n < 4; n++)
                    s[r + 4 * o] += t[r + 4 * n] * i[n + 4 * o];
        for (r = 0; r < 16; r++)
            e[r] = s[r]
    }
    ,
    _.prototype.identity = function() {
        for (var t = 0; t < 16; t++)
            this.tr[t] = t % 5 == 0 ? 1 : 0
    }
    ,
    _.prototype.getArray = function() {
        return this.tr
    }
    ,
    _.prototype.getCopyMatrix = function() {
        return new Float32Array(this.tr)
    }
    ,
    _.prototype.setMatrix = function(t) {
        if (null != this.tr && this.tr.length == this.tr.length)
            for (var i = 0; i < 16; i++)
                this.tr[i] = t[i]
    }
    ,
    _.prototype.getScaleX = function() {
        return this.tr[0]
    }
    ,
    _.prototype.getScaleY = function() {
        return this.tr[5]
    }
    ,
    _.prototype.transformX = function(t) {
        return this.tr[0] * t + this.tr[12]
    }
    ,
    _.prototype.transformY = function(t) {
        return this.tr[5] * t + this.tr[13]
    }
    ,
    _.prototype.invertTransformX = function(t) {
        return (t - this.tr[12]) / this.tr[0]
    }
    ,
    _.prototype.invertTransformY = function(t) {
        return (t - this.tr[13]) / this.tr[5]
    }
    ,
    _.prototype.multTranslate = function(t, i) {
        _.mul([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, i, 0, 1], this.tr, this.tr)
    }
    ,
    _.prototype.translate = function(t, i) {
        this.tr[12] = t,
        this.tr[13] = i
    }
    ,
    _.prototype.translateX = function(t) {
        this.tr[12] = t
    }
    ,
    _.prototype.translateY = function(t) {
        this.tr[13] = t
    }
    ,
    _.prototype.multScale = function(t, i) {
        _.mul([t, 0, 0, 0, 0, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], this.tr, this.tr)
    }
    ,
    _.prototype.scale = function(t, i) {
        this.tr[0] = t,
        this.tr[5] = i
    }
    ,
    (a.prototype = new _).setPosition = function(t, i) {
        this.translate(t, i)
    }
    ,
    a.prototype.setCenterPosition = function(t, i) {
        var e = this.width * this.getScaleX()
          , r = this.height * this.getScaleY();
        this.translate(t - e / 2, i - r / 2)
    }
    ,
    a.prototype.top = function(t) {
        this.setY(t)
    }
    ,
    a.prototype.bottom = function(t) {
        var i = this.height * this.getScaleY();
        this.translateY(t - i)
    }
    ,
    a.prototype.left = function(t) {
        this.setX(t)
    }
    ,
    a.prototype.right = function(t) {
        var i = this.width * this.getScaleX();
        this.translateX(t - i)
    }
    ,
    a.prototype.centerX = function(t) {
        var i = this.width * this.getScaleX();
        this.translateX(t - i / 2)
    }
    ,
    a.prototype.centerY = function(t) {
        var i = this.height * this.getScaleY();
        this.translateY(t - i / 2)
    }
    ,
    a.prototype.setX = function(t) {
        this.translateX(t)
    }
    ,
    a.prototype.setY = function(t) {
        this.translateY(t)
    }
    ,
    a.prototype.setHeight = function(t) {
        var i = t / this.height
          , e = -i;
        this.scale(i, e)
    }
    ,
    a.prototype.setWidth = function(t) {
        var i = t / this.width
          , e = -i;
        this.scale(i, e)
    }
    ,
    (h.prototype = new MotionQueueManager).getCurrentPriority = function() {
        return this.currentPriority
    }
    ,
    h.prototype.getReservePriority = function() {
        return this.reservePriority
    }
    ,
    h.prototype.reserveMotion = function(t) {
        return !(this.reservePriority >= t || this.currentPriority >= t || (this.reservePriority = t,
        0))
    }
    ,
    h.prototype.setReservePriority = function(t) {
        this.reservePriority = t
    }
    ,
    h.prototype.updateParam = function(t) {
        var i = MotionQueueManager.prototype.updateParam.call(this, t);
        return this.isFinished() && (this.currentPriority = 0),
        i
    }
    ,
    h.prototype.startMotionPrio = function(t, i) {
        return i == this.reservePriority && (this.reservePriority = 0),
        this.currentPriority = i,
        this.startMotion(t, !1)
    }
    ,
    l.load = function(t) {
        for (var i = new l, e = c.getPlatformManager().jsonParseFromBytes(t).physics_hair, r = e.length, o = 0; o < r; o++) {
            var n = e[o]
              , s = new PhysicsHair
              , _ = n.setup
              , a = parseFloat(_.length)
              , h = parseFloat(_.regist)
              , $ = parseFloat(_.mass);
            s.setup(a, h, $);
            for (var u = n.src, p = u.length, f = 0; f < p; f++) {
                var d = u[f]
                  , g = d.id
                  , y = PhysicsHair.Src.SRC_TO_X;
                "x" === (L = d.ptype) ? y = PhysicsHair.Src.SRC_TO_X : "y" === L ? y = PhysicsHair.Src.SRC_TO_Y : "angle" === L ? y = PhysicsHair.Src.SRC_TO_G_ANGLE : UtDebug.error("live2d", "Invalid parameter:PhysicsHair.Src");
                var m = parseFloat(d.scale)
                  , T = parseFloat(d.weight);
                s.addSrcParam(y, g, m, T)
            }
            for (var P = n.targets, S = P.length, f = 0; f < S; f++) {
                var v = P[f]
                  , g = v.id
                  , y = PhysicsHair.Target.TARGET_FROM_ANGLE
                  , L = v.ptype;
                "angle" === L ? y = PhysicsHair.Target.TARGET_FROM_ANGLE : "angle_v" === L ? y = PhysicsHair.Target.TARGET_FROM_ANGLE_V : UtDebug.error("live2d", "Invalid parameter:PhysicsHair.Target");
                var m = parseFloat(v.scale)
                  , T = parseFloat(v.weight);
                s.addTargetParam(y, g, m, T)
            }
            i.physicsList.push(s)
        }
        return i
    }
    ,
    l.prototype.updateParam = function(t) {
        for (var i = UtSystem.getUserTimeMSec() - this.startTimeMSec, e = 0; e < this.physicsList.length; e++)
            this.physicsList[e].update(t, i)
    }
    ,
    $.load = function(t) {
        for (var i = new $, e = c.getPlatformManager().jsonParseFromBytes(t).parts_visible, r = e.length, o = 0; o < r; o++) {
            for (var n = e[o].group, s = n.length, _ = new Array, a = 0; a < s; a++) {
                var h = n[a]
                  , l = new u(h.id);
                if (_[a] = l,
                null != h.link) {
                    var p = h.link
                      , f = p.length;
                    l.link = new Array;
                    for (var d = 0; d < f; d++) {
                        var g = new u(p[d]);
                        l.link.push(g)
                    }
                }
            }
            i.partsGroups.push(_)
        }
        return i
    }
    ,
    $.prototype.updateParam = function(t) {
        if (null != t) {
            t != this.lastModel && this.initParam(t),
            this.lastModel = t;
            var i = UtSystem.getUserTimeMSec()
              , e = 0 == this.lastTime ? 0 : (i - this.lastTime) / 1e3;
            this.lastTime = i,
            e < 0 && (e = 0);
            for (var r = 0; r < this.partsGroups.length; r++)
                this.normalizePartsOpacityGroup(t, this.partsGroups[r], e),
                this.copyOpacityOtherParts(t, this.partsGroups[r])
        }
    }
    ,
    $.prototype.initParam = function(t) {
        if (null != t)
            for (var i = 0; i < this.partsGroups.length; i++)
                for (var e = this.partsGroups[i], r = 0; r < e.length; r++) {
                    e[r].initIndex(t);
                    var o = e[r].partsIndex
                      , n = e[r].paramIndex;
                    if (!(o < 0)) {
                        var s = 0 != t.getParamFloat(n);
                        if (t.setPartsOpacity(o, s ? 1 : 0),
                        t.setParamFloat(n, s ? 1 : 0),
                        null != e[r].link)
                            for (var _ = 0; _ < e[r].link.length; _++)
                                e[r].link[_].initIndex(t)
                    }
                }
    }
    ,
    $.prototype.normalizePartsOpacityGroup = function(t, i, e) {
        for (var r = -1, o = 1, n = 0; n < i.length; n++) {
            var s = i[n].partsIndex
              , _ = i[n].paramIndex;
            if (!(s < 0) && 0 != t.getParamFloat(_)) {
                if (r >= 0)
                    break;
                r = n,
                o = t.getPartsOpacity(s),
                (o += e / .5) > 1 && (o = 1)
            }
        }
        for (r < 0 && (r = 0,
        o = 1),
        n = 0; n < i.length; n++)
            if (!((s = i[n].partsIndex) < 0))
                if (r == n)
                    t.setPartsOpacity(s, o);
                else {
                    var a, h = t.getPartsOpacity(s);
                    (1 - (a = o < .5 ? -.5 * o / .5 + 1 : .5 * (1 - o) / .5)) * (1 - o) > .15 && (a = 1 - .15 / (1 - o)),
                    h > a && (h = a),
                    t.setPartsOpacity(s, h)
                }
    }
    ,
    $.prototype.copyOpacityOtherParts = function(t, i) {
        for (var e = 0; e < i.length; e++) {
            var r = i[e];
            if (null != r.link && !(r.partsIndex < 0))
                for (var o = t.getPartsOpacity(r.partsIndex), n = 0; n < r.link.length; n++) {
                    var s = r.link[n];
                    s.partsIndex < 0 || t.setPartsOpacity(s.partsIndex, o)
                }
        }
    }
    ,
    u.prototype.initIndex = function(t) {
        this.paramIndex = t.getParamIndex("VISIBLE:" + this.id),
        this.partsIndex = t.getPartsDataIndex(PartsDataID.getID(this.id)),
        t.setParamFloat(this.paramIndex, 1)
    }
    ,
    p.FRAME_RATE = 30,
    p.prototype.setPoint = function(t, i) {
        this.faceTargetX = t,
        this.faceTargetY = i
    }
    ,
    p.prototype.getX = function() {
        return this.faceX
    }
    ,
    p.prototype.getY = function() {
        return this.faceY
    }
    ,
    p.prototype.update = function() {
        var t = 40 / 7.5 / p.FRAME_RATE;
        if (0 != this.lastTimeSec) {
            var i = UtSystem.getUserTimeMSec()
              , e = (i - this.lastTimeSec) * p.FRAME_RATE / 1e3;
            this.lastTimeSec = i;
            var r = e * t / (.15 * p.FRAME_RATE)
              , o = this.faceTargetX - this.faceX
              , n = this.faceTargetY - this.faceY;
            if (!(Math.abs(o) <= this.EPSILON && Math.abs(n) <= this.EPSILON)) {
                var s = Math.sqrt(o * o + n * n)
                  , _ = t * n / s
                  , a = t * o / s - this.faceVX
                  , h = _ - this.faceVY
                  , l = Math.sqrt(a * a + h * h);
                (l < -r || l > r) && (a *= r / l,
                h *= r / l,
                l = r),
                this.faceVX += a,
                this.faceVY += h;
                var $ = .5 * (Math.sqrt(r * r + 16 * r * s - 8 * r * s) - r)
                  , u = Math.sqrt(this.faceVX * this.faceVX + this.faceVY * this.faceVY);
                u > $ && (this.faceVX *= $ / u,
                this.faceVY *= $ / u),
                this.faceX += this.faceVX,
                this.faceY += this.faceVY
            }
        } else
            this.lastTimeSec = UtSystem.getUserTimeMSec()
    }
    ,
    (f.prototype = new _).getMaxScale = function() {
        return this.max
    }
    ,
    f.prototype.getMinScale = function() {
        return this.min
    }
    ,
    f.prototype.setMaxScale = function(t) {
        this.max = t
    }
    ,
    f.prototype.setMinScale = function(t) {
        this.min = t
    }
    ,
    f.prototype.isMaxScale = function() {
        return this.getScaleX() == this.max
    }
    ,
    f.prototype.isMinScale = function() {
        return this.getScaleX() == this.min
    }
    ,
    f.prototype.adjustTranslate = function(t, i) {
        this.tr[0] * this.maxLeft + (this.tr[12] + t) > this.screenLeft && (t = this.screenLeft - this.tr[0] * this.maxLeft - this.tr[12]),
        this.tr[0] * this.maxRight + (this.tr[12] + t) < this.screenRight && (t = this.screenRight - this.tr[0] * this.maxRight - this.tr[12]),
        this.tr[5] * this.maxTop + (this.tr[13] + i) < this.screenTop && (i = this.screenTop - this.tr[5] * this.maxTop - this.tr[13]),
        this.tr[5] * this.maxBottom + (this.tr[13] + i) > this.screenBottom && (i = this.screenBottom - this.tr[5] * this.maxBottom - this.tr[13]),
        _.mul([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, i, 0, 1], this.tr, this.tr)
    }
    ,
    f.prototype.adjustScale = function(t, i, e) {
        var r = e * this.tr[0];
        r < this.min ? this.tr[0] > 0 && (e = this.min / this.tr[0]) : r > this.max && this.tr[0] > 0 && (e = this.max / this.tr[0]);
        var o = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, i, 0, 1]
          , n = [e, 0, 0, 0, 0, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        _.mul([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -t, -i, 0, 1], this.tr, this.tr),
        _.mul(n, this.tr, this.tr),
        _.mul(o, this.tr, this.tr)
    }
    ,
    f.prototype.setScreenRect = function(t, i, e, r) {
        this.screenLeft = t,
        this.screenRight = i,
        this.screenTop = r,
        this.screenBottom = e
    }
    ,
    f.prototype.setMaxScreenRect = function(t, i, e, r) {
        this.maxLeft = t,
        this.maxRight = i,
        this.maxTop = r,
        this.maxBottom = e
    }
    ,
    f.prototype.getScreenLeft = function() {
        return this.screenLeft
    }
    ,
    f.prototype.getScreenRight = function() {
        return this.screenRight
    }
    ,
    f.prototype.getScreenBottom = function() {
        return this.screenBottom
    }
    ,
    f.prototype.getScreenTop = function() {
        return this.screenTop
    }
    ,
    f.prototype.getMaxLeft = function() {
        return this.maxLeft
    }
    ,
    f.prototype.getMaxRight = function() {
        return this.maxRight
    }
    ,
    f.prototype.getMaxBottom = function() {
        return this.maxBottom
    }
    ,
    f.prototype.getMaxTop = function() {
        return this.maxTop
    }
    ,
    c.platformManager = null,
    c.getPlatformManager = function() {
        return c.platformManager
    }
    ,
    c.setPlatformManager = function(t) {
        c.platformManager = t
    }
    ,
    t.exports = {
        L2DTargetPoint: p,
        Live2DFramework: c,
        L2DViewMatrix: f,
        L2DPose: $,
        L2DPartsParam: u,
        L2DPhysics: l,
        L2DMotionManager: h,
        L2DModelMatrix: a,
        L2DMatrix44: _,
        EYE_STATE: g,
        L2DEyeBlink: s,
        L2DExpressionParam: n,
        L2DExpressionMotion: o,
        L2DBaseModel: r
    }
}
, function(t, i, e) {
    t.exports = {
        DEBUG_LOG: !1,
        DEBUG_MOUSE_LOG: !1,
        DEBUG_DRAW_HIT_AREA: !1,
        DEBUG_DRAW_ALPHA_MODEL: !1,
        VIEW_MAX_SCALE: 2,
        VIEW_MIN_SCALE: .8,
        VIEW_LOGICAL_LEFT: -1,
        VIEW_LOGICAL_RIGHT: 1,
        VIEW_LOGICAL_MAX_LEFT: -2,
        VIEW_LOGICAL_MAX_RIGHT: 2,
        VIEW_LOGICAL_MAX_BOTTOM: -2,
        VIEW_LOGICAL_MAX_TOP: 2,
        PRIORITY_NONE: 0,
        PRIORITY_IDLE: 1,
        PRIORITY_SLEEPY: 2,
        PRIORITY_NORMAL: 3,
        PRIORITY_FORCE: 4,
        MOTION_GROUP_IDLE: "idle",
        MOTION_GROUP_SLEEPY: "sleepy",
        MOTION_GROUP_TAP_BODY: "tap_body",
        MOTION_GROUP_FLICK_HEAD: "flick_head",
        MOTION_GROUP_PINCH_IN: "pinch_in",
        MOTION_GROUP_PINCH_OUT: "pinch_out",
        MOTION_GROUP_SHAKE: "shake",
        HIT_AREA_HEAD: "head",
        HIT_AREA_BODY: "body"
    }
}
, function(t, i, e) {
    Object.defineProperty(i, "__esModule", {
        value: !0
    }),
    i.setContext = function(t) {
        r = t
    }
    ,
    i.getContext = function() {
        return r
    }
    ;
    var r = void 0
}
, function(t, i, e) {
    function r() {}
    r.matrixStack = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    r.depth = 0,
    r.currentMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    r.tmp = new Array(16),
    r.reset = function() {
        this.depth = 0
    }
    ,
    r.loadIdentity = function() {
        for (var t = 0; t < 16; t++)
            this.currentMatrix[t] = t % 5 == 0 ? 1 : 0
    }
    ,
    r.push = function() {
        var t = (this.depth,
        16 * (this.depth + 1));
        this.matrixStack.length < t + 16 && (this.matrixStack.length = t + 16);
        for (var i = 0; i < 16; i++)
            this.matrixStack[t + i] = this.currentMatrix[i];
        this.depth++
    }
    ,
    r.pop = function() {
        --this.depth < 0 && (myError("Invalid matrix stack."),
        this.depth = 0);
        for (var t = 16 * this.depth, i = 0; i < 16; i++)
            this.currentMatrix[i] = this.matrixStack[t + i]
    }
    ,
    r.getMatrix = function() {
        return this.currentMatrix
    }
    ,
    r.multMatrix = function(t) {
        var i, e, r;
        for (i = 0; i < 16; i++)
            this.tmp[i] = 0;
        for (i = 0; i < 4; i++)
            for (e = 0; e < 4; e++)
                for (r = 0; r < 4; r++)
                    this.tmp[i + 4 * e] += this.currentMatrix[i + 4 * r] * t[r + 4 * e];
        for (i = 0; i < 16; i++)
            this.currentMatrix[i] = this.tmp[i]
    }
    ,
    t.exports = r
}
, function(t, i, e) {
    t.exports = e(5)
}
, function(t, i, e) {
    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    function o(t) {
        var i = v.width
          , e = v.height;
        L = new c.L2DTargetPoint;
        var r = e / i
          , o = g.default.VIEW_LOGICAL_LEFT
          , n = g.default.VIEW_LOGICAL_RIGHT
          , s = -r
          , _ = r;
        if ((M = new c.L2DViewMatrix).setScreenRect(o, n, s, _),
        M.setMaxScreenRect(g.default.VIEW_LOGICAL_MAX_LEFT, g.default.VIEW_LOGICAL_MAX_RIGHT, g.default.VIEW_LOGICAL_MAX_BOTTOM, g.default.VIEW_LOGICAL_MAX_TOP),
        M.setMaxScale(g.default.VIEW_MAX_SCALE),
        M.setMinScale(g.default.VIEW_MIN_SCALE),
        (E = new c.L2DMatrix44).multScale(1, i / e),
        (A = new c.L2DMatrix44).multTranslate(-i / 2, -e / 2),
        A.multScale(2 / i, -2 / i),
        S = function() {
            for (var t = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"], i = 0; i < t.length; i++)
                try {
                    var e = v.getContext(t[i], {
                        premultipliedAlpha: !0
                    });
                    if (e)
                        return e
                } catch (t) {}
            return null
        }(),
        (0,
        m.setContext)(S),
        !S)
            return console.error("Failed to create WebGL context."),
            void (window.WebGLRenderingContext && console.error("Your browser don't support WebGL, check https://get.webgl.org/ for futher information."));
        window.Live2D.setGL(S),
        S.clearColor(0, 0, 0, 0),
        function(t) {
            T.reloadFlg = !0,
            T.count++,
            T.changeModel(S, t)
        }(t),
        P || (P = !0,
        function t() {
            (function() {
                y.default.reset(),
                y.default.loadIdentity(),
                L.update(),
                T.setDrag(L.getX(), L.getY()),
                S.clear(S.COLOR_BUFFER_BIT),
                y.default.multMatrix(E.getArray()),
                y.default.multMatrix(M.getArray()),
                y.default.push();
                for (var t = 0; t < T.numModels(); t++) {
                    var i = T.getModel(t);
                    if (null == i)
                        return;
                    i.initialized && !i.updating && (i.update(),
                    i.draw(S))
                }
                y.default.pop()
            }
            )(),
            (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame)(t, v)
        }())
    }
    function n(t, i, e) {
        function r(t, i) {
            return 180 * Math.acos(function(t, i) {
                return t.x * i.x + t.y * i.y
            }({
                x: 0,
                y: 1
            }, function(t, i) {
                var e = Math.sqrt(t * t + i * i);
                return {
                    x: t / e,
                    y: i / e
                }
            }(t, i))) / Math.PI
        }
        if (i.x < e.left + e.width && i.y < e.top + e.height && i.x > e.left && i.y > e.top)
            return i;
        var o = t.x - i.x
          , n = t.y - i.y
          , s = r(o, n);
        i.x < t.x && (s = 360 - s);
        var _ = 360 - r(e.left - t.x, -1 * (e.top - t.y))
          , a = 360 - r(e.left - t.x, -1 * (e.top + e.height - t.y))
          , h = r(e.left + e.width - t.x, -1 * (e.top - t.y))
          , l = r(e.left + e.width - t.x, -1 * (e.top + e.height - t.y))
          , $ = n / o
          , u = {};
        if (s < h) {
            var p = e.top - t.y
              , f = p / $;
            u = {
                y: t.y + p,
                x: t.x + f
            }
        } else if (s < l) {
            var c = e.left + e.width - t.x
              , d = c * $;
            u = {
                y: t.y + d,
                x: t.x + c
            }
        } else if (s < a) {
            var g = e.top + e.height - t.y
              , y = g / $;
            u = {
                y: t.y + g,
                x: t.x + y
            }
        } else if (s < _) {
            var m = t.x - e.left
              , T = m * $;
            u = {
                y: t.y - T,
                x: t.x - m
            }
        } else {
            var P = e.top - t.y
              , S = P / $;
            u = {
                y: t.y + P,
                x: t.x + S
            }
        }
        return u
    }
    function s(t) {
        I = !0;
        var i = v.getBoundingClientRect()
          , e = p(t.clientX - i.left)
          , r = f(t.clientY - i.top)
          , o = n({
            x: i.left + i.width / 2,
            y: i.top + i.height * O
        }, {
            x: t.clientX,
            y: t.clientY
        }, i)
          , s = $(o.x - i.left)
          , _ = u(o.y - i.top);
        g.default.DEBUG_MOUSE_LOG && console.log("onMouseMove device( x:" + t.clientX + " y:" + t.clientY + " ) view( x:" + s + " y:" + _ + ")"),
        w = e,
        x = r,
        L.setPoint(s, _)
    }
    function _() {
        I && (I = !1),
        L.setPoint(0, 0)
    }
    function a() {
        g.default.DEBUG_LOG && console.log("Set Session Storage."),
        sessionStorage.setItem("Sleepy", "1")
    }
    function h(t) {
        if ("mousewheel" == t.type)
            ;
        else if ("mousedown" == t.type)
            !function(t) {
                I = !0;
                var i = v.getBoundingClientRect()
                  , e = p(t.clientX - i.left)
                  , r = f(t.clientY - i.top)
                  , o = n({
                    x: i.left + i.width / 2,
                    y: i.top + i.height * O
                }, {
                    x: t.clientX,
                    y: t.clientY
                }, i)
                  , s = $(o.x - i.left)
                  , _ = u(o.y - i.top);
                g.default.DEBUG_MOUSE_LOG && console.log("onMouseDown device( x:" + t.clientX + " y:" + t.clientY + " ) view( x:" + s + " y:" + _ + ")"),
                w = e,
                x = r,
                T.tapEvent(s, _)
            }(t);
        else if ("mousemove" == t.type)
            "1" === sessionStorage.getItem("Sleepy") && sessionStorage.setItem("Sleepy", "0"),
            s(t);
        else if ("mouseup" == t.type) {
            if ("button"in t && 0 != t.button)
                return
        } else if ("mouseout" == t.type) {
            g.default.DEBUG_LOG && console.log("Mouse out Window."),
            _();
            var i = sessionStorage.getItem("SleepyTimer");
            window.clearTimeout(i),
            i = window.setTimeout(a, 5e4),
            sessionStorage.setItem("SleepyTimer", i)
        }
    }
    function l(t) {
        var i = t.touches[0];
        "touchstart" == t.type ? 1 == t.touches.length && s(i) : "touchmove" == t.type ? function(t) {
            var i = v.getBoundingClientRect()
              , e = p(t.clientX - i.left)
              , r = f(t.clientY - i.top)
              , o = n({
                x: i.left + i.width / 2,
                y: i.top + i.height * O
            }, {
                x: t.clientX,
                y: t.clientY
            }, i)
              , s = $(o.x - i.left)
              , _ = u(o.y - i.top);
            g.default.DEBUG_MOUSE_LOG && console.log("onMouseMove device( x:" + t.clientX + " y:" + t.clientY + " ) view( x:" + s + " y:" + _ + ")"),
            I && (w = e,
            x = r,
            L.setPoint(s, _))
        }(i) : "touchend" == t.type && _()
    }
    function $(t) {
        var i = A.transformX(t);
        return M.invertTransformX(i)
    }
    function u(t) {
        var i = A.transformY(t);
        return M.invertTransformY(i)
    }
    function p(t) {
        return A.transformX(t)
    }
    function f(t) {
        return A.transformY(t)
    }
    e(6);
    var c = e(0)
      , d = r(e(8))
      , g = r(e(1))
      , y = r(e(3))
      , m = e(2)
      , T = (window.navigator.platform.toLowerCase(),
    new d.default)
      , P = !1
      , S = null
      , v = null
      , L = null
      , M = null
      , E = null
      , A = null
      , I = !1
      , w = 0
      , x = 0
      , O = .5;
    window.loadlive2d = function(t, i, e, r) {
        window.modelJson = r,
        O = void 0 === e ? .5 : e,
        function(t) {
            (v = document.getElementById(t)).addEventListener && (window.addEventListener("click", h),
            window.addEventListener("mousedown", h),
            window.addEventListener("mousemove", h),
            window.addEventListener("mouseup", h),
            document.addEventListener("mouseout", h),
            window.addEventListener("touchstart", l),
            window.addEventListener("touchend", l),
            window.addEventListener("touchmove", l))
        }(t),
        o(i)
    }
}
, function(t, i, e) {
    (function(t) {
        !function() {
            function i() {
                Lt || (this._$MT = null,
                this._$5S = null,
                this._$NP = 0,
                i._$42++,
                this._$5S = new N(this))
            }
            function e(t) {
                if (!Lt) {
                    this.clipContextList = new Array,
                    this.glcontext = t.gl,
                    this.dp_webgl = t,
                    this.curFrameNo = 0,
                    this.firstError_clipInNotUpdate = !0,
                    this.colorBuffer = 0,
                    this.isInitGLFBFunc = !1,
                    this.tmpBoundsOnModel = new g,
                    rt.glContext.length > rt.frameBuffers.length && (this.curFrameNo = this.getMaskRenderTexture()),
                    this.tmpModelToViewMatrix = new w,
                    this.tmpMatrix2 = new w,
                    this.tmpMatrixForMask = new w,
                    this.tmpMatrixForDraw = new w,
                    this.CHANNEL_COLORS = new Array;
                    var i = new v;
                    (i = new v).r = 0,
                    i.g = 0,
                    i.b = 0,
                    i.a = 1,
                    this.CHANNEL_COLORS.push(i),
                    (i = new v).r = 1,
                    i.g = 0,
                    i.b = 0,
                    i.a = 0,
                    this.CHANNEL_COLORS.push(i),
                    (i = new v).r = 0,
                    i.g = 1,
                    i.b = 0,
                    i.a = 0,
                    this.CHANNEL_COLORS.push(i),
                    (i = new v).r = 0,
                    i.g = 0,
                    i.b = 1,
                    i.a = 0,
                    this.CHANNEL_COLORS.push(i);
                    for (var e = 0; e < this.CHANNEL_COLORS.length; e++)
                        this.dp_webgl.setChannelFlagAsColor(e, this.CHANNEL_COLORS[e])
                }
            }
            function r(t, i, e) {
                this.clipIDList = new Array,
                this.clipIDList = e,
                this.clippingMaskDrawIndexList = new Array;
                for (var r = 0; r < e.length; r++)
                    this.clippingMaskDrawIndexList.push(i.getDrawDataIndex(e[r]));
                this.clippedDrawContextList = new Array,
                this.isUsing = !0,
                this.layoutChannelNo = 0,
                this.layoutBounds = new g,
                this.allClippedDrawRect = new g,
                this.matrixForMask = new Float32Array(16),
                this.matrixForDraw = new Float32Array(16),
                this.owner = t
            }
            function o() {
                Lt || (this._$dP = null,
                this._$eo = null,
                this._$V0 = null,
                this._$dP = 1e3,
                this._$eo = 1e3,
                this._$V0 = 1,
                this._$a0())
            }
            function n() {}
            function s() {
                Lt || (this.x = null,
                this.y = null,
                this.width = null,
                this.height = null)
            }
            function _(t) {
                Lt || Z.prototype.constructor.call(this, t)
            }
            function a(t) {
                Lt || Z.prototype.constructor.call(this, t)
            }
            function h() {
                Lt || (this._$vo = null,
                this._$F2 = null,
                this._$ao = 400,
                this._$1S = 400,
                h._$42++)
            }
            function l() {
                Lt || (this.p1 = new $,
                this.p2 = new $,
                this._$Fo = 0,
                this._$Db = 0,
                this._$L2 = 0,
                this._$M2 = 0,
                this._$ks = 0,
                this._$9b = 0,
                this._$iP = 0,
                this._$iT = 0,
                this._$lL = new Array,
                this._$qP = new Array,
                this.setup(.3, .5, .1))
            }
            function $() {
                this._$p = 1,
                this.x = 0,
                this.y = 0,
                this.vx = 0,
                this.vy = 0,
                this.ax = 0,
                this.ay = 0,
                this.fx = 0,
                this.fy = 0,
                this._$s0 = 0,
                this._$70 = 0,
                this._$7L = 0,
                this._$HL = 0
            }
            function u(t, i, e) {
                this._$wL = null,
                this.scale = null,
                this._$V0 = null,
                this._$wL = t,
                this.scale = i,
                this._$V0 = e
            }
            function p(t, i, e, r) {
                u.prototype.constructor.call(this, i, e, r),
                this._$tL = null,
                this._$tL = t
            }
            function f(t, i, e) {
                this._$wL = null,
                this.scale = null,
                this._$V0 = null,
                this._$wL = t,
                this.scale = i,
                this._$V0 = e
            }
            function c(t, i, e, r) {
                f.prototype.constructor.call(this, i, e, r),
                this._$YP = null,
                this._$YP = t
            }
            function d() {
                Lt || (this._$fL = 0,
                this._$gL = 0,
                this._$B0 = 1,
                this._$z0 = 1,
                this._$qT = 0,
                this.reflectX = !1,
                this.reflectY = !1)
            }
            function g() {
                Lt || (this.x = null,
                this.y = null,
                this.width = null,
                this.height = null)
            }
            function y() {}
            function T() {
                Lt || (this.x = null,
                this.y = null)
            }
            function P() {
                Lt || (this._$gP = null,
                this._$dr = null,
                this._$GS = null,
                this._$qb = null,
                this._$Lb = null,
                this._$mS = null,
                this.clipID = null,
                this.clipIDList = new Array)
            }
            function S() {
                Lt || (this._$Eb = S._$ps,
                this._$lT = 1,
                this._$C0 = 1,
                this._$tT = 1,
                this._$WL = 1,
                this.culling = !1,
                this.matrix4x4 = new Float32Array(16),
                this.premultipliedAlpha = !1,
                this.anisotropy = 0,
                this.clippingProcess = S.CLIPPING_PROCESS_NONE,
                this.clipBufPre_clipContextMask = null,
                this.clipBufPre_clipContextDraw = null,
                this.CHANNEL_COLORS = new Array)
            }
            function v() {
                Lt || (this.a = 1,
                this.r = 1,
                this.g = 1,
                this.b = 1,
                this.scale = 1,
                this._$ho = 1,
                this.blendMode = rt.L2D_COLOR_BLEND_MODE_MULT)
            }
            function L() {
                Lt || (this._$kP = null,
                this._$dr = null,
                this._$Ai = !0,
                this._$mS = null)
            }
            function M() {}
            function E() {
                Lt || (this._$VP = 0,
                this._$wL = null,
                this._$GP = null,
                this._$8o = E._$ds,
                this._$2r = -1,
                this._$O2 = 0,
                this._$ri = 0)
            }
            function A() {}
            function I() {
                Lt || (this._$Ob = null)
            }
            function w() {
                this.m = new Float32Array(16),
                this.identity()
            }
            function x(t) {
                Lt || Z.prototype.constructor.call(this, t)
            }
            function O() {
                Lt || (this._$7 = 1,
                this._$f = 0,
                this._$H = 0,
                this._$g = 1,
                this._$k = 0,
                this._$w = 0,
                this._$hi = STATE_IDENTITY,
                this._$Z = _$pS)
            }
            function D() {
                Lt || (o.prototype.constructor.call(this),
                this.motions = new Array,
                this._$7r = null,
                this._$7r = D._$Co++,
                this._$D0 = 30,
                this._$yT = 0,
                this._$E = !0,
                this.loopFadeIn = !0,
                this._$AS = -1,
                _$a0())
            }
            function R() {
                this._$P = new Float32Array(100),
                this.size = 0
            }
            function b() {
                this._$4P = null,
                this._$I0 = null,
                this._$RP = null
            }
            function F() {}
            function C() {}
            function N(t) {
                Lt || (this._$QT = !0,
                this._$co = -1,
                this._$qo = 0,
                this._$pb = new Array(N._$is),
                this._$_2 = new Float32Array(N._$is),
                this._$vr = new Float32Array(N._$is),
                this._$Rr = new Float32Array(N._$is),
                this._$Or = new Float32Array(N._$is),
                this._$fs = new Float32Array(N._$is),
                this._$Js = new Array(N._$is),
                this._$3S = new Array,
                this._$aS = new Array,
                this._$Bo = null,
                this._$F2 = new Array,
                this._$db = new Array,
                this._$8b = new Array,
                this._$Hr = new Array,
                this._$Ws = null,
                this._$Vs = null,
                this._$Er = null,
                this._$Es = new Int16Array(F._$Qb),
                this._$ZP = new Float32Array(2 * F._$1r),
                this._$Ri = t,
                this._$b0 = N._$HP++,
                this.clipManager = null,
                this.dp_webgl = null)
            }
            function B() {}
            function G() {
                Lt || (this._$12 = null,
                this._$bb = null,
                this._$_L = null,
                this._$jo = null,
                this._$iL = null,
                this._$0L = null,
                this._$Br = null,
                this._$Dr = null,
                this._$Cb = null,
                this._$mr = null,
                this._$_L = St.STATE_FIRST,
                this._$Br = 4e3,
                this._$Dr = 100,
                this._$Cb = 50,
                this._$mr = 150,
                this._$jo = !0,
                this._$iL = "PARAM_EYE_L_OPEN",
                this._$0L = "PARAM_EYE_R_OPEN")
            }
            function U() {
                Lt || (S.prototype.constructor.call(this),
                this._$sb = new Int32Array(U._$As),
                this._$U2 = new Array,
                this.transform = null,
                this.gl = null,
                null == U._$NT && (U._$NT = U._$9r(256),
                U._$vS = U._$9r(256),
                U._$no = U._$vb(256)))
            }
            function Y() {
                Lt || (L.prototype.constructor.call(this),
                this._$GS = null,
                this._$Y0 = null)
            }
            function k(t) {
                et.prototype.constructor.call(this, t),
                this._$8r = L._$ur,
                this._$Yr = null,
                this._$Wr = null
            }
            function V() {
                Lt || (P.prototype.constructor.call(this),
                this._$gP = null,
                this._$dr = null,
                this._$GS = null,
                this._$qb = null,
                this._$Lb = null,
                this._$mS = null)
            }
            function X() {
                Lt || (this._$NL = null,
                this._$3S = null,
                this._$aS = null,
                X._$42++)
            }
            function z() {
                Lt || (i.prototype.constructor.call(this),
                this._$zo = new U)
            }
            function H() {
                Lt || (o.prototype.constructor.call(this),
                this.motions = new Array,
                this._$o2 = null,
                this._$7r = H._$Co++,
                this._$D0 = 30,
                this._$yT = 0,
                this._$E = !1,
                this.loopFadeIn = !0,
                this._$rr = -1,
                this._$eP = 0)
            }
            function W(t, i) {
                return String.fromCharCode(t.getUint8(i))
            }
            function R() {
                this._$P = new Float32Array(100),
                this.size = 0
            }
            function b() {
                this._$4P = null,
                this._$I0 = null,
                this._$RP = null
            }
            function j() {
                Lt || (L.prototype.constructor.call(this),
                this._$o = 0,
                this._$A = 0,
                this._$GS = null,
                this._$Eo = null)
            }
            function q(t) {
                et.prototype.constructor.call(this, t),
                this._$8r = L._$ur,
                this._$Cr = null,
                this._$hr = null
            }
            function J() {
                Lt || (this.visible = !0,
                this._$g0 = !1,
                this._$NL = null,
                this._$3S = null,
                this._$aS = null,
                J._$42++)
            }
            function Q(t) {
                this._$VS = null,
                this._$e0 = null,
                this._$e0 = t
            }
            function Z(t) {
                Lt || (this.id = t)
            }
            function K() {
                Lt || (this._$4S = null)
            }
            function tt(t, i) {
                this.canvas = t,
                this.context = i,
                this.viewport = new Array(0,0,t.width,t.height),
                this._$6r = 1,
                this._$xP = 0,
                this._$3r = 1,
                this._$uP = 0,
                this._$Qo = -1,
                this.cacheImages = {}
            }
            function it() {
                Lt || (this._$TT = null,
                this._$LT = null,
                this._$FS = null,
                this._$wL = null)
            }
            function et(t) {
                Lt || (this._$e0 = null,
                this._$IP = null,
                this._$JS = !1,
                this._$AT = !0,
                this._$e0 = t,
                this.totalScale = 1,
                this._$7s = 1,
                this.totalOpacity = 1)
            }
            function rt() {}
            function ot() {}
            function nt(t) {
                Lt || (this._$ib = t)
            }
            function st() {
                Lt || (V.prototype.constructor.call(this),
                this._$LP = -1,
                this._$d0 = 0,
                this._$Yo = 0,
                this._$JP = null,
                this._$5P = null,
                this._$BP = null,
                this._$Eo = null,
                this._$Qi = null,
                this._$6s = st._$ms,
                this.culling = !0,
                this.gl_cacheImage = null,
                this.instanceNo = st._$42++)
            }
            function _t(t) {
                mt.prototype.constructor.call(this, t),
                this._$8r = V._$ur,
                this._$Cr = null,
                this._$hr = null
            }
            function at() {
                Lt || (this.x = null,
                this.y = null)
            }
            function ht(t) {
                Lt || (i.prototype.constructor.call(this),
                this.drawParamWebGL = new ft(t),
                this.drawParamWebGL.setGL(rt.getGL(t)))
            }
            function lt() {
                Lt || (this.motions = null,
                this._$eb = !1,
                this.motions = new Array)
            }
            function $t() {
                this._$w0 = null,
                this._$AT = !0,
                this._$9L = !1,
                this._$z2 = -1,
                this._$bs = -1,
                this._$Do = -1,
                this._$sr = null,
                this._$sr = $t._$Gs++
            }
            function ut() {
                this.m = new Array(1,0,0,0,1,0,0,0,1)
            }
            function pt(t) {
                Lt || Z.prototype.constructor.call(this, t)
            }
            function ft(t) {
                Lt || (S.prototype.constructor.call(this),
                this.textures = new Array,
                this.transform = null,
                this.gl = null,
                this.glno = t,
                this.firstDraw = !0,
                this.anisotropyExt = null,
                this.maxAnisotropy = 0,
                this._$As = 32,
                this._$Gr = !1,
                this._$NT = null,
                this._$vS = null,
                this._$no = null,
                this.vertShader = null,
                this.fragShader = null,
                this.vertShaderOff = null,
                this.fragShaderOff = null)
            }
            function ct(t, i, e) {
                return null == i && (i = t.createBuffer()),
                t.bindBuffer(t.ARRAY_BUFFER, i),
                t.bufferData(t.ARRAY_BUFFER, e, t.DYNAMIC_DRAW),
                i
            }
            function dt(t, i, e) {
                return null == i && (i = t.createBuffer()),
                t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, i),
                t.bufferData(t.ELEMENT_ARRAY_BUFFER, e, t.DYNAMIC_DRAW),
                i
            }
            function gt(t) {
                Lt || (this._$P = new Int8Array(8),
                this._$R0 = new DataView(this._$P.buffer),
                this._$3i = new Int8Array(1e3),
                this._$hL = 0,
                this._$v0 = 0,
                this._$S2 = 0,
                this._$Ko = new Array,
                this._$T = t,
                this._$F = 0)
            }
            function yt() {}
            function mt(t) {
                Lt || (this._$e0 = null,
                this._$IP = null,
                this._$Us = null,
                this._$7s = null,
                this._$IS = [!1],
                this._$VS = null,
                this._$AT = !0,
                this.baseOpacity = 1,
                this.clipBufPre_clipContext = null,
                this._$e0 = t)
            }
            function Tt() {}
            Lt = !0,
            i._$0s = 1,
            i._$4s = 2,
            i._$42 = 0,
            i._$62 = function(t, e) {
                try {
                    if (e instanceof ArrayBuffer && (e = new DataView(e)),
                    !(e instanceof DataView))
                        throw new nt("_$SS#loadModel(b) / b _$x be DataView or ArrayBuffer");
                    var r, o = new gt(e), s = o._$ST(), _ = o._$ST(), a = o._$ST();
                    if (109 != s || 111 != _ || 99 != a)
                        throw new nt("_$gi _$C _$li , _$Q0 _$P0.");
                    if (r = o._$ST(),
                    o._$gr(r),
                    r > C._$T7)
                        throw t._$NP |= i._$4s,
                        new nt("_$gi _$C _$li , _$n0 _$_ version _$li ( SDK : " + C._$T7 + " < _$f0 : " + r + " )@_$SS#loadModel()\n");
                    var h = o._$nP();
                    if (r >= C._$s7) {
                        var l = o._$9T()
                          , $ = o._$9T();
                        if (-30584 != l || -30584 != $)
                            throw t._$NP |= i._$0s,
                            new nt("_$gi _$C _$li , _$0 _$6 _$Ui.")
                    }
                    t._$KS(h);
                    var u = t.getModelContext();
                    u.setDrawParam(t.getDrawParam()),
                    u.init()
                } catch (t) {
                    n._$Rb(t)
                }
            }
            ,
            i.prototype._$KS = function(t) {
                this._$MT = t
            }
            ,
            i.prototype.getModelImpl = function() {
                return null == this._$MT && (this._$MT = new h,
                this._$MT._$zP()),
                this._$MT
            }
            ,
            i.prototype.getCanvasWidth = function() {
                return null == this._$MT ? 0 : this._$MT.getCanvasWidth()
            }
            ,
            i.prototype.getCanvasHeight = function() {
                return null == this._$MT ? 0 : this._$MT.getCanvasHeight()
            }
            ,
            i.prototype.getParamFloat = function(t) {
                return "number" != typeof t && (t = this._$5S.getParamIndex(a.getID(t))),
                this._$5S.getParamFloat(t)
            }
            ,
            i.prototype.setParamFloat = function(t, i, e) {
                "number" != typeof t && (t = this._$5S.getParamIndex(a.getID(t))),
                arguments.length < 3 && (e = 1),
                this._$5S.setParamFloat(t, this._$5S.getParamFloat(t) * (1 - e) + i * e)
            }
            ,
            i.prototype.addToParamFloat = function(t, i, e) {
                "number" != typeof t && (t = this._$5S.getParamIndex(a.getID(t))),
                arguments.length < 3 && (e = 1),
                this._$5S.setParamFloat(t, this._$5S.getParamFloat(t) + i * e)
            }
            ,
            i.prototype.multParamFloat = function(t, i, e) {
                "number" != typeof t && (t = this._$5S.getParamIndex(a.getID(t))),
                arguments.length < 3 && (e = 1),
                this._$5S.setParamFloat(t, this._$5S.getParamFloat(t) * (1 + (i - 1) * e))
            }
            ,
            i.prototype.getParamIndex = function(t) {
                return this._$5S.getParamIndex(a.getID(t))
            }
            ,
            i.prototype.loadParam = function() {
                this._$5S.loadParam()
            }
            ,
            i.prototype.saveParam = function() {
                this._$5S.saveParam()
            }
            ,
            i.prototype.init = function() {
                this._$5S.init()
            }
            ,
            i.prototype.update = function() {
                this._$5S.update()
            }
            ,
            i.prototype._$Rs = function() {
                return n._$li("_$60 _$PT _$Rs()"),
                -1
            }
            ,
            i.prototype._$Ds = function(t) {
                n._$li("_$60 _$PT _$SS#_$Ds() \n")
            }
            ,
            i.prototype._$K2 = function() {}
            ,
            i.prototype.draw = function() {}
            ,
            i.prototype.getModelContext = function() {
                return this._$5S
            }
            ,
            i.prototype._$s2 = function() {
                return this._$NP
            }
            ,
            i.prototype._$P7 = function(t, i, e, r) {
                var o = -1
                  , n = 0
                  , s = this;
                if (0 != e)
                    if (1 == t.length) {
                        var _ = t[0]
                          , a = 0 != s.getParamFloat(_)
                          , h = i[0]
                          , l = s.getPartsOpacity(h)
                          , $ = e / r;
                        a ? (l += $) > 1 && (l = 1) : (l -= $) < 0 && (l = 0),
                        s.setPartsOpacity(h, l)
                    } else {
                        for (f = 0; f < t.length; f++)
                            if (_ = t[f],
                            c = 0 != s.getParamFloat(_)) {
                                if (o >= 0)
                                    break;
                                o = f,
                                h = i[f],
                                n = s.getPartsOpacity(h),
                                (n += e / r) > 1 && (n = 1)
                            }
                        for (o < 0 && (console.log("No _$wi _$q0/ _$U default[%s]", t[0]),
                        o = 0,
                        n = 1,
                        s.loadParam(),
                        s.setParamFloat(t[o], n),
                        s.saveParam()),
                        f = 0; f < t.length; f++)
                            if (h = i[f],
                            o == f)
                                s.setPartsOpacity(h, n);
                            else {
                                var u, p = s.getPartsOpacity(h);
                                (1 - (u = n < .5 ? -.5 * n / .5 + 1 : .5 * (1 - n) / .5)) * (1 - n) > .15 && (u = 1 - .15 / (1 - n)),
                                p > u && (p = u),
                                s.setPartsOpacity(h, p)
                            }
                    }
                else
                    for (var f = 0; f < t.length; f++) {
                        var _ = t[f]
                          , h = i[f]
                          , c = 0 != s.getParamFloat(_);
                        s.setPartsOpacity(h, c ? 1 : 0)
                    }
            }
            ,
            i.prototype.setPartsOpacity = function(t, i) {
                "number" != typeof t && (t = this._$5S.getPartsDataIndex(_.getID(t))),
                this._$5S.setPartsOpacity(t, i)
            }
            ,
            i.prototype.getPartsDataIndex = function(t) {
                return t instanceof _ || (t = _.getID(t)),
                this._$5S.getPartsDataIndex(t)
            }
            ,
            i.prototype.getPartsOpacity = function(t) {
                return "number" != typeof t && (t = this._$5S.getPartsDataIndex(_.getID(t))),
                t < 0 ? 0 : this._$5S.getPartsOpacity(t)
            }
            ,
            i.prototype.getDrawParam = function() {}
            ,
            i.prototype.getDrawDataIndex = function(t) {
                return this._$5S.getDrawDataIndex(x.getID(t))
            }
            ,
            i.prototype.getDrawData = function(t) {
                return this._$5S.getDrawData(t)
            }
            ,
            i.prototype.getTransformedPoints = function(t) {
                var i = this._$5S._$C2(t);
                return i instanceof _t ? i.getTransformedPoints() : null
            }
            ,
            i.prototype.getIndexArray = function(t) {
                if (t < 0 || t >= this._$5S._$aS.length)
                    return null;
                var i = this._$5S._$aS[t];
                return null != i && i.getType() == V._$wb && i instanceof st ? i.getIndexArray() : null
            }
            ,
            e.CHANNEL_COUNT = 4,
            e.RENDER_TEXTURE_USE_MIPMAP = !1,
            e.NOT_USED_FRAME = -100,
            e.prototype._$L7 = function() {
                if (this.tmpModelToViewMatrix && (this.tmpModelToViewMatrix = null),
                this.tmpMatrix2 && (this.tmpMatrix2 = null),
                this.tmpMatrixForMask && (this.tmpMatrixForMask = null),
                this.tmpMatrixForDraw && (this.tmpMatrixForDraw = null),
                this.tmpBoundsOnModel && (this.tmpBoundsOnModel = null),
                this.CHANNEL_COLORS) {
                    for (var t = this.CHANNEL_COLORS.length - 1; t >= 0; --t)
                        this.CHANNEL_COLORS.splice(t, 1);
                    this.CHANNEL_COLORS = []
                }
                this.releaseShader()
            }
            ,
            e.prototype.releaseShader = function() {
                for (var t = rt.frameBuffers.length, i = 0; i < t; i++)
                    this.gl.deleteFramebuffer(rt.frameBuffers[i].framebuffer);
                rt.frameBuffers = [],
                rt.glContext = []
            }
            ,
            e.prototype.init = function(t, i, e) {
                for (var o = 0; o < i.length; o++) {
                    var n = i[o].getClipIDList();
                    if (null != n) {
                        var s = this.findSameClip(n);
                        null == s && (s = new r(this,t,n),
                        this.clipContextList.push(s));
                        var _ = i[o].getDrawDataID()
                          , a = t.getDrawDataIndex(_);
                        s.addClippedDrawData(_, a),
                        e[o].clipBufPre_clipContext = s
                    }
                }
            }
            ,
            e.prototype.getMaskRenderTexture = function() {
                var t = null;
                return t = this.dp_webgl.createFramebuffer(),
                rt.frameBuffers[this.dp_webgl.glno] = t,
                this.dp_webgl.glno
            }
            ,
            e.prototype.setupClip = function(t, i) {
                for (var e = 0, r = 0; r < this.clipContextList.length; r++)
                    s = this.clipContextList[r],
                    this.calcClippedDrawTotalBounds(t, s),
                    s.isUsing && e++;
                if (e > 0) {
                    var o = i.gl.getParameter(i.gl.FRAMEBUFFER_BINDING)
                      , n = new Array(4);
                    for (n[0] = 0,
                    n[1] = 0,
                    n[2] = i.gl.canvas.width,
                    n[3] = i.gl.canvas.height,
                    i.gl.viewport(0, 0, rt.clippingMaskBufferSize, rt.clippingMaskBufferSize),
                    this.setupLayoutBounds(e),
                    i.gl.bindFramebuffer(i.gl.FRAMEBUFFER, rt.frameBuffers[this.curFrameNo].framebuffer),
                    i.gl.clearColor(0, 0, 0, 0),
                    i.gl.clear(i.gl.COLOR_BUFFER_BIT),
                    r = 0; r < this.clipContextList.length; r++) {
                        var s, _ = (s = this.clipContextList[r]).allClippedDrawRect, a = (s.layoutChannelNo,
                        s.layoutBounds);
                        this.tmpBoundsOnModel._$jL(_),
                        this.tmpBoundsOnModel.expand(.05 * _.width, .05 * _.height);
                        var h = a.width / this.tmpBoundsOnModel.width
                          , l = a.height / this.tmpBoundsOnModel.height;
                        this.tmpMatrix2.identity(),
                        this.tmpMatrix2.translate(-1, -1, 0),
                        this.tmpMatrix2.scale(2, 2, 1),
                        this.tmpMatrix2.translate(a.x, a.y, 0),
                        this.tmpMatrix2.scale(h, l, 1),
                        this.tmpMatrix2.translate(-this.tmpBoundsOnModel.x, -this.tmpBoundsOnModel.y, 0),
                        this.tmpMatrixForMask.setMatrix(this.tmpMatrix2.m),
                        this.tmpMatrix2.identity(),
                        this.tmpMatrix2.translate(a.x, a.y, 0),
                        this.tmpMatrix2.scale(h, l, 1),
                        this.tmpMatrix2.translate(-this.tmpBoundsOnModel.x, -this.tmpBoundsOnModel.y, 0),
                        this.tmpMatrixForDraw.setMatrix(this.tmpMatrix2.m);
                        for (var $ = this.tmpMatrixForMask.getArray(), u = 0; u < 16; u++)
                            s.matrixForMask[u] = $[u];
                        for (var p = this.tmpMatrixForDraw.getArray(), u = 0; u < 16; u++)
                            s.matrixForDraw[u] = p[u];
                        for (var f = s.clippingMaskDrawIndexList.length, c = 0; c < f; c++) {
                            var d = s.clippingMaskDrawIndexList[c]
                              , g = t.getDrawData(d)
                              , y = t._$C2(d);
                            i.setClipBufPre_clipContextForMask(s),
                            g.draw(i, t, y)
                        }
                    }
                    i.gl.bindFramebuffer(i.gl.FRAMEBUFFER, o),
                    i.setClipBufPre_clipContextForMask(null),
                    i.gl.viewport(n[0], n[1], n[2], n[3])
                }
            }
            ,
            e.prototype.getColorBuffer = function() {
                return this.colorBuffer
            }
            ,
            e.prototype.findSameClip = function(t) {
                for (var i = 0; i < this.clipContextList.length; i++) {
                    var e = this.clipContextList[i]
                      , r = e.clipIDList.length;
                    if (r == t.length) {
                        for (var o = 0, n = 0; n < r; n++)
                            for (var s = e.clipIDList[n], _ = 0; _ < r; _++)
                                if (t[_] == s) {
                                    o++;
                                    break
                                }
                        if (o == r)
                            return e
                    }
                }
                return null
            }
            ,
            e.prototype.calcClippedDrawTotalBounds = function(t, i) {
                for (var e = t._$Ri.getModelImpl().getCanvasWidth(), r = t._$Ri.getModelImpl().getCanvasHeight(), o = e > r ? e : r, n = o, s = o, _ = 0, a = 0, h = i.clippedDrawContextList.length, l = 0; l < h; l++) {
                    var $ = i.clippedDrawContextList[l].drawDataIndex
                      , u = t._$C2($);
                    if (u._$yo()) {
                        for (var p = u.getTransformedPoints(), f = p.length, c = [], d = [], g = 0, y = F._$i2; y < f; y += F._$No)
                            c[g] = p[y],
                            d[g] = p[y + 1],
                            g++;
                        var m = Math.min.apply(null, c)
                          , T = Math.min.apply(null, d)
                          , P = Math.max.apply(null, c)
                          , S = Math.max.apply(null, d);
                        m < n && (n = m),
                        T < s && (s = T),
                        P > _ && (_ = P),
                        S > a && (a = S)
                    }
                }
                if (n == o)
                    i.allClippedDrawRect.x = 0,
                    i.allClippedDrawRect.y = 0,
                    i.allClippedDrawRect.width = 0,
                    i.allClippedDrawRect.height = 0,
                    i.isUsing = !1;
                else {
                    var v = _ - n
                      , L = a - s;
                    i.allClippedDrawRect.x = n,
                    i.allClippedDrawRect.y = s,
                    i.allClippedDrawRect.width = v,
                    i.allClippedDrawRect.height = L,
                    i.isUsing = !0
                }
            }
            ,
            e.prototype.setupLayoutBounds = function(t) {
                var i = t / e.CHANNEL_COUNT
                  , r = t % e.CHANNEL_COUNT;
                i = ~~i,
                r = ~~r;
                for (var o = 0, s = 0; s < e.CHANNEL_COUNT; s++) {
                    var _ = i + (s < r ? 1 : 0);
                    if (0 == _)
                        ;
                    else if (1 == _)
                        ($ = this.clipContextList[o++]).layoutChannelNo = s,
                        $.layoutBounds.x = 0,
                        $.layoutBounds.y = 0,
                        $.layoutBounds.width = 1,
                        $.layoutBounds.height = 1;
                    else if (2 == _)
                        for (a = 0; a < _; a++)
                            h = 0,
                            l = ~~(l = a % 2),
                            ($ = this.clipContextList[o++]).layoutChannelNo = s,
                            $.layoutBounds.x = .5 * l,
                            $.layoutBounds.y = 0,
                            $.layoutBounds.width = .5,
                            $.layoutBounds.height = 1;
                    else if (_ <= 4)
                        for (a = 0; a < _; a++)
                            l = ~~(l = a % 2),
                            h = ~~(h = a / 2),
                            ($ = this.clipContextList[o++]).layoutChannelNo = s,
                            $.layoutBounds.x = .5 * l,
                            $.layoutBounds.y = .5 * h,
                            $.layoutBounds.width = .5,
                            $.layoutBounds.height = .5;
                    else if (_ <= 9)
                        for (var a = 0; a < _; a++) {
                            var h, l = a % 3;
                            l = ~~l,
                            h = ~~(h = a / 3);
                            var $ = this.clipContextList[o++];
                            $.layoutChannelNo = s,
                            $.layoutBounds.x = l / 3,
                            $.layoutBounds.y = h / 3,
                            $.layoutBounds.width = 1 / 3,
                            $.layoutBounds.height = 1 / 3
                        }
                    else
                        n._$li("_$6 _$0P mask count : %d", _)
                }
            }
            ,
            r.prototype.addClippedDrawData = function(t, i) {
                var e = new function(t, i) {
                    this._$gP = t,
                    this.drawDataIndex = i
                }
                (t,i);
                this.clippedDrawContextList.push(e)
            }
            ,
            o._$JT = function(t, i, e) {
                var r = t / i
                  , o = e / i
                  , n = 1 - (1 - o) * (1 - o)
                  , s = 1 - (1 - o) * (1 - o)
                  , _ = 1 / 3 * (1 - o) * n + (o * (2 / 3) + 1 / 3 * (1 - o)) * (1 - n)
                  , a = (o + 2 / 3 * (1 - o)) * s + (o * (1 / 3) + 2 / 3 * (1 - o)) * (1 - s)
                  , h = 1 - 3 * a + 3 * _ - 0
                  , l = 3 * a - 6 * _ + 0
                  , $ = 3 * _ - 0;
                if (r <= 0)
                    return 0;
                if (r >= 1)
                    return 1;
                var u = r * r;
                return h * (r * u) + l * u + $ * r + 0
            }
            ,
            o.prototype._$a0 = function() {}
            ,
            o.prototype.setFadeIn = function(t) {
                this._$dP = t
            }
            ,
            o.prototype.setFadeOut = function(t) {
                this._$eo = t
            }
            ,
            o.prototype._$pT = function(t) {
                this._$V0 = t
            }
            ,
            o.prototype.getFadeOut = function() {
                return this._$eo
            }
            ,
            o.prototype._$4T = function() {
                return this._$eo
            }
            ,
            o.prototype._$mT = function() {
                return this._$V0
            }
            ,
            o.prototype.getDurationMSec = function() {
                return -1
            }
            ,
            o.prototype.getLoopDurationMSec = function() {
                return -1
            }
            ,
            o.prototype.updateParam = function(t, i) {
                if (i._$AT && !i._$9L) {
                    var e = M.getUserTimeMSec();
                    if (i._$z2 < 0) {
                        i._$z2 = e,
                        i._$bs = e;
                        var r = this.getDurationMSec();
                        i._$Do < 0 && (i._$Do = r <= 0 ? -1 : i._$z2 + r)
                    }
                    var o = this._$V0;
                    0 <= (o = o * (0 == this._$dP ? 1 : ot._$r2((e - i._$bs) / this._$dP)) * (0 == this._$eo || i._$Do < 0 ? 1 : ot._$r2((i._$Do - e) / this._$eo))) && o <= 1 || console.log("### assert!! ### "),
                    this.updateParamExe(t, e, o, i),
                    i._$Do > 0 && i._$Do < e && (i._$9L = !0)
                }
            }
            ,
            o.prototype.updateParamExe = function(t, i, e, r) {}
            ,
            n._$8s = 0,
            n._$fT = new Object,
            n.start = function(t) {
                var i = n._$fT[t];
                null == i && (i = new function() {
                    this._$r = null,
                    this._$0S = null
                }
                ,
                i._$r = t,
                n._$fT[t] = i),
                i._$0S = M.getSystemTimeMSec()
            }
            ,
            n.dump = function(t) {
                var i = n._$fT[t];
                if (null != i) {
                    var e = M.getSystemTimeMSec() - i._$0S;
                    return console.log(t + " : " + e + "ms"),
                    e
                }
                return -1
            }
            ,
            n.end = function(t) {
                var i = n._$fT[t];
                return null != i ? M.getSystemTimeMSec() - i._$0S : -1
            }
            ,
            n._$li = function(t, i) {
                console.log("_$li : " + t + "\n", i)
            }
            ,
            n._$Ji = function(t, i) {
                console.log(t, i)
            }
            ,
            n._$dL = function(t, i) {
                console.log(t, i),
                console.log("\n")
            }
            ,
            n._$KL = function(t, i) {
                for (var e = 0; e < i; e++)
                    e % 16 == 0 && e > 0 ? console.log("\n") : e % 8 == 0 && e > 0 && console.log("  "),
                    console.log("%02X ", 255 & t[e]);
                console.log("\n")
            }
            ,
            n._$nr = function(t, i, e) {
                console.log("%s\n", t);
                for (var r = i.length, o = 0; o < r; ++o)
                    console.log("%5d", i[o]),
                    console.log("%s\n", e),
                    console.log(",");
                console.log("\n")
            }
            ,
            n._$Rb = function(t) {
                console.log("dump exception : " + t),
                console.log("stack :: " + t.stack)
            }
            ,
            s.prototype._$8P = function() {
                return .5 * (this.x + this.x + this.width)
            }
            ,
            s.prototype._$6P = function() {
                return .5 * (this.y + this.y + this.height)
            }
            ,
            s.prototype._$EL = function() {
                return this.x + this.width
            }
            ,
            s.prototype._$5T = function() {
                return this.y + this.height
            }
            ,
            s.prototype._$jL = function(t, i, e, r) {
                this.x = t,
                this.y = i,
                this.width = e,
                this.height = r
            }
            ,
            s.prototype._$jL = function(t) {
                this.x = t.x,
                this.y = t.y,
                this.width = t.width,
                this.height = t.height
            }
            ,
            _.prototype = new Z,
            _._$tP = new Object,
            _._$27 = function() {
                _._$tP.clear()
            }
            ,
            _.getID = function(t) {
                var i = _._$tP[t];
                return null == i && (i = new _(t),
                _._$tP[t] = i),
                i
            }
            ,
            _.prototype._$3s = function() {
                return new _
            }
            ,
            a.prototype = new Z,
            a._$tP = new Object,
            a._$27 = function() {
                a._$tP.clear()
            }
            ,
            a.getID = function(t) {
                var i = a._$tP[t];
                return null == i && (i = new a(t),
                a._$tP[t] = i),
                i
            }
            ,
            a.prototype._$3s = function() {
                return new a
            }
            ,
            h._$42 = 0,
            h.prototype._$zP = function() {
                null == this._$vo && (this._$vo = new K),
                null == this._$F2 && (this._$F2 = new Array)
            }
            ,
            h.prototype.getCanvasWidth = function() {
                return this._$ao
            }
            ,
            h.prototype.getCanvasHeight = function() {
                return this._$1S
            }
            ,
            h.prototype._$F0 = function(t) {
                this._$vo = t._$nP(),
                this._$F2 = t._$nP(),
                this._$ao = t._$6L(),
                this._$1S = t._$6L()
            }
            ,
            h.prototype._$6S = function(t) {
                this._$F2.push(t)
            }
            ,
            h.prototype._$Xr = function() {
                return this._$F2
            }
            ,
            h.prototype._$E2 = function() {
                return this._$vo
            }
            ,
            l.prototype.setup = function(t, i, e) {
                this._$ks = this._$Yb(),
                this.p2._$xT(),
                3 == arguments.length && (this._$Fo = t,
                this._$L2 = i,
                this.p1._$p = e,
                this.p2._$p = e,
                this.p2.y = t,
                this.setup())
            }
            ,
            l.prototype.getPhysicsPoint1 = function() {
                return this.p1
            }
            ,
            l.prototype.getPhysicsPoint2 = function() {
                return this.p2
            }
            ,
            l.prototype._$qr = function() {
                return this._$Db
            }
            ,
            l.prototype._$pr = function(t) {
                this._$Db = t
            }
            ,
            l.prototype._$5r = function() {
                return this._$M2
            }
            ,
            l.prototype._$Cs = function() {
                return this._$9b
            }
            ,
            l.prototype._$Yb = function() {
                return -180 * Math.atan2(this.p1.x - this.p2.x, -(this.p1.y - this.p2.y)) / Math.PI
            }
            ,
            l.prototype.addSrcParam = function(t, i, e, r) {
                var o = new p(t,i,e,r);
                this._$lL.push(o)
            }
            ,
            l.prototype.addTargetParam = function(t, i, e, r) {
                var o = new c(t,i,e,r);
                this._$qP.push(o)
            }
            ,
            l.prototype.update = function(t, i) {
                if (0 == this._$iP)
                    return this._$iP = this._$iT = i,
                    void (this._$Fo = Math.sqrt((this.p1.x - this.p2.x) * (this.p1.x - this.p2.x) + (this.p1.y - this.p2.y) * (this.p1.y - this.p2.y)));
                var e = (i - this._$iT) / 1e3;
                if (0 != e) {
                    for (r = this._$lL.length - 1; r >= 0; --r)
                        this._$lL[r]._$oP(t, this);
                    this._$oo(t, e),
                    this._$M2 = this._$Yb(),
                    this._$9b = (this._$M2 - this._$ks) / e,
                    this._$ks = this._$M2
                }
                for (var r = this._$qP.length - 1; r >= 0; --r)
                    this._$qP[r]._$YS(t, this);
                this._$iT = i
            }
            ,
            l.prototype._$oo = function(t, i) {
                i < .033 && (i = .033);
                var e = 1 / i;
                this.p1.vx = (this.p1.x - this.p1._$s0) * e,
                this.p1.vy = (this.p1.y - this.p1._$70) * e,
                this.p1.ax = (this.p1.vx - this.p1._$7L) * e,
                this.p1.ay = (this.p1.vy - this.p1._$HL) * e,
                this.p1.fx = this.p1.ax * this.p1._$p,
                this.p1.fy = this.p1.ay * this.p1._$p,
                this.p1._$xT();
                var r, o, n = -Math.atan2(this.p1.y - this.p2.y, this.p1.x - this.p2.x), s = Math.cos(n), _ = Math.sin(n), a = 9.8 * this.p2._$p, h = this._$Db * yt._$bS, l = a * Math.cos(n - h);
                r = l * _,
                o = l * s;
                var $ = -this.p1.fx * _ * _
                  , u = -this.p1.fy * _ * s
                  , p = -this.p2.vx * this._$L2
                  , f = -this.p2.vy * this._$L2;
                this.p2.fx = r + $ + p,
                this.p2.fy = o + u + f,
                this.p2.ax = this.p2.fx / this.p2._$p,
                this.p2.ay = this.p2.fy / this.p2._$p,
                this.p2.vx += this.p2.ax * i,
                this.p2.vy += this.p2.ay * i,
                this.p2.x += this.p2.vx * i,
                this.p2.y += this.p2.vy * i;
                var c = Math.sqrt((this.p1.x - this.p2.x) * (this.p1.x - this.p2.x) + (this.p1.y - this.p2.y) * (this.p1.y - this.p2.y));
                this.p2.x = this.p1.x + this._$Fo * (this.p2.x - this.p1.x) / c,
                this.p2.y = this.p1.y + this._$Fo * (this.p2.y - this.p1.y) / c,
                this.p2.vx = (this.p2.x - this.p2._$s0) * e,
                this.p2.vy = (this.p2.y - this.p2._$70) * e,
                this.p2._$xT()
            }
            ,
            $.prototype._$xT = function() {
                this._$s0 = this.x,
                this._$70 = this.y,
                this._$7L = this.vx,
                this._$HL = this.vy
            }
            ,
            u.prototype._$oP = function(t, i) {}
            ,
            (p.prototype = new u)._$oP = function(t, i) {
                var e = this.scale * t.getParamFloat(this._$wL)
                  , r = i.getPhysicsPoint1();
                switch (this._$tL) {
                default:
                case l.Src.SRC_TO_X:
                    r.x = r.x + (e - r.x) * this._$V0;
                    break;
                case l.Src.SRC_TO_Y:
                    r.y = r.y + (e - r.y) * this._$V0;
                    break;
                case l.Src.SRC_TO_G_ANGLE:
                    var o = i._$qr();
                    o += (e - o) * this._$V0,
                    i._$pr(o)
                }
            }
            ,
            f.prototype._$YS = function(t, i) {}
            ,
            (c.prototype = new f)._$YS = function(t, i) {
                switch (this._$YP) {
                default:
                case l.Target.TARGET_FROM_ANGLE:
                    t.setParamFloat(this._$wL, this.scale * i._$5r(), this._$V0);
                    break;
                case l.Target.TARGET_FROM_ANGLE_V:
                    t.setParamFloat(this._$wL, this.scale * i._$Cs(), this._$V0)
                }
            }
            ,
            (l.Src = function() {}
            ).SRC_TO_X = "SRC_TO_X",
            l.Src.SRC_TO_Y = "SRC_TO_Y",
            l.Src.SRC_TO_G_ANGLE = "SRC_TO_G_ANGLE",
            (l.Target = function() {}
            ).TARGET_FROM_ANGLE = "TARGET_FROM_ANGLE",
            l.Target.TARGET_FROM_ANGLE_V = "TARGET_FROM_ANGLE_V",
            d.prototype.init = function(t) {
                this._$fL = t._$fL,
                this._$gL = t._$gL,
                this._$B0 = t._$B0,
                this._$z0 = t._$z0,
                this._$qT = t._$qT,
                this.reflectX = t.reflectX,
                this.reflectY = t.reflectY
            }
            ,
            d.prototype._$F0 = function(t) {
                this._$fL = t._$_T(),
                this._$gL = t._$_T(),
                this._$B0 = t._$_T(),
                this._$z0 = t._$_T(),
                this._$qT = t._$_T(),
                t.getFormatVersion() >= C.LIVE2D_FORMAT_VERSION_V2_10_SDK2 && (this.reflectX = t._$po(),
                this.reflectY = t._$po())
            }
            ,
            d.prototype._$e = function() {}
            ;
            var Pt = function() {};
            Pt._$ni = function(t, i, e, r, o, n, s, _, a) {
                var h = s * n - _ * o;
                if (0 == h)
                    return null;
                var l, $ = ((t - e) * n - (i - r) * o) / h;
                return l = 0 != o ? (t - e - $ * s) / o : (i - r - $ * _) / n,
                isNaN(l) && (l = (t - e - $ * s) / o,
                isNaN(l) && (l = (i - r - $ * _) / n),
                isNaN(l) && (console.log("a is NaN @UtVector#_$ni() "),
                console.log("v1x : " + o),
                console.log("v1x != 0 ? " + (0 != o)))),
                null == a ? new Array(l,$) : (a[0] = l,
                a[1] = $,
                a)
            }
            ,
            g.prototype._$8P = function() {
                return this.x + .5 * this.width
            }
            ,
            g.prototype._$6P = function() {
                return this.y + .5 * this.height
            }
            ,
            g.prototype._$EL = function() {
                return this.x + this.width
            }
            ,
            g.prototype._$5T = function() {
                return this.y + this.height
            }
            ,
            g.prototype._$jL = function(t, i, e, r) {
                this.x = t,
                this.y = i,
                this.width = e,
                this.height = r
            }
            ,
            g.prototype._$jL = function(t) {
                this.x = t.x,
                this.y = t.y,
                this.width = t.width,
                this.height = t.height
            }
            ,
            g.prototype.contains = function(t, i) {
                return this.x <= this.x && this.y <= this.y && this.x <= this.x + this.width && this.y <= this.y + this.height
            }
            ,
            g.prototype.expand = function(t, i) {
                this.x -= t,
                this.y -= i,
                this.width += 2 * t,
                this.height += 2 * i
            }
            ,
            y._$Z2 = function(t, i, e, r) {
                var o = i._$Q2(t, e)
                  , n = t._$vs()
                  , s = t._$Tr();
                if (i._$zr(n, s, o),
                o <= 0)
                    return r[n[0]];
                if (1 == o)
                    return (_ = r[n[0]]) + ((a = r[n[1]]) - _) * (F = s[0]) | 0;
                if (2 == o) {
                    var _ = r[n[0]]
                      , a = r[n[1]]
                      , h = r[n[2]]
                      , l = r[n[3]];
                    return (B = _ + (a - _) * (F = s[0]) | 0) + ((G = h + (l - h) * F | 0) - B) * (C = s[1]) | 0
                }
                if (3 == o) {
                    var $ = r[n[0]]
                      , u = r[n[1]]
                      , p = r[n[2]]
                      , f = r[n[3]]
                      , c = r[n[4]]
                      , d = r[n[5]]
                      , g = r[n[6]]
                      , y = r[n[7]];
                    return (B = (_ = $ + (u - $) * (F = s[0]) | 0) + ((a = p + (f - p) * F | 0) - _) * (C = s[1]) | 0) + ((G = (h = c + (d - c) * F | 0) + ((l = g + (y - g) * F | 0) - h) * C | 0) - B) * (N = s[2]) | 0
                }
                if (4 == o) {
                    var m = r[n[0]]
                      , T = r[n[1]]
                      , P = r[n[2]]
                      , S = r[n[3]]
                      , v = r[n[4]]
                      , L = r[n[5]]
                      , M = r[n[6]]
                      , E = r[n[7]]
                      , A = r[n[8]]
                      , I = r[n[9]]
                      , w = r[n[10]]
                      , x = r[n[11]]
                      , O = r[n[12]]
                      , D = r[n[13]]
                      , R = r[n[14]]
                      , b = r[n[15]]
                      , F = s[0]
                      , C = s[1]
                      , N = s[2]
                      , B = (_ = ($ = m + (T - m) * F | 0) + ((u = P + (S - P) * F | 0) - $) * C | 0) + ((a = (p = v + (L - v) * F | 0) + ((f = M + (E - M) * F | 0) - p) * C | 0) - _) * N | 0
                      , G = (h = (c = A + (I - A) * F | 0) + ((d = w + (x - w) * F | 0) - c) * C | 0) + ((l = (g = O + (D - O) * F | 0) + ((y = R + (b - R) * F | 0) - g) * C | 0) - h) * N | 0;
                    return B + (G - B) * s[3] | 0
                }
                for (var U = 1 << o, Y = new Float32Array(U), k = 0; k < U; k++) {
                    for (var V = k, X = 1, z = 0; z < o; z++)
                        X *= V % 2 == 0 ? 1 - s[z] : s[z],
                        V /= 2;
                    Y[k] = X
                }
                for (var H = new Float32Array(U), W = 0; W < U; W++)
                    H[W] = r[n[W]];
                for (var j = 0, W = 0; W < U; W++)
                    j += Y[W] * H[W];
                return j + .5 | 0
            }
            ,
            y._$br = function(t, i, e, r) {
                var o = i._$Q2(t, e)
                  , n = t._$vs()
                  , s = t._$Tr();
                if (i._$zr(n, s, o),
                o <= 0)
                    return r[n[0]];
                if (1 == o)
                    return (_ = r[n[0]]) + ((a = r[n[1]]) - _) * ($ = s[0]);
                if (2 == o) {
                    var _ = r[n[0]]
                      , a = r[n[1]]
                      , h = r[n[2]]
                      , l = r[n[3]]
                      , $ = s[0];
                    return (1 - (T = s[1])) * (_ + (a - _) * $) + T * (h + (l - h) * $)
                }
                if (3 == o) {
                    var u = r[n[0]]
                      , p = r[n[1]]
                      , f = r[n[2]]
                      , c = r[n[3]]
                      , d = r[n[4]]
                      , g = r[n[5]]
                      , y = r[n[6]]
                      , m = r[n[7]]
                      , $ = s[0]
                      , T = s[1];
                    return (1 - (N = s[2])) * ((1 - T) * (u + (p - u) * $) + T * (f + (c - f) * $)) + N * ((1 - T) * (d + (g - d) * $) + T * (y + (m - y) * $))
                }
                if (4 == o) {
                    var P = r[n[0]]
                      , S = r[n[1]]
                      , v = r[n[2]]
                      , L = r[n[3]]
                      , M = r[n[4]]
                      , E = r[n[5]]
                      , A = r[n[6]]
                      , I = r[n[7]]
                      , w = r[n[8]]
                      , x = r[n[9]]
                      , O = r[n[10]]
                      , D = r[n[11]]
                      , R = r[n[12]]
                      , b = r[n[13]]
                      , F = r[n[14]]
                      , C = r[n[15]]
                      , $ = s[0]
                      , T = s[1]
                      , N = s[2]
                      , B = s[3];
                    return (1 - B) * ((1 - N) * ((1 - T) * (P + (S - P) * $) + T * (v + (L - v) * $)) + N * ((1 - T) * (M + (E - M) * $) + T * (A + (I - A) * $))) + B * ((1 - N) * ((1 - T) * (w + (x - w) * $) + T * (O + (D - O) * $)) + N * ((1 - T) * (R + (b - R) * $) + T * (F + (C - F) * $)))
                }
                for (var G = 1 << o, U = new Float32Array(G), Y = 0; Y < G; Y++) {
                    for (var k = Y, V = 1, X = 0; X < o; X++)
                        V *= k % 2 == 0 ? 1 - s[X] : s[X],
                        k /= 2;
                    U[Y] = V
                }
                for (var z = new Float32Array(G), H = 0; H < G; H++)
                    z[H] = r[n[H]];
                for (var W = 0, H = 0; H < G; H++)
                    W += U[H] * z[H];
                return W
            }
            ,
            y._$Vr = function(t, i, e, r, o, n, s, _) {
                var a = i._$Q2(t, e)
                  , h = t._$vs()
                  , l = t._$Tr();
                i._$zr(h, l, a);
                var $ = 2 * r
                  , u = s;
                if (a <= 0)
                    if (p = o[h[0]],
                    2 == _ && 0 == s)
                        M._$jT(p, 0, n, 0, $);
                    else
                        for (g = 0; g < $; )
                            n[u] = p[g++],
                            n[u + 1] = p[g++],
                            u += _;
                else if (1 == a)
                    for (var p = o[h[0]], f = o[h[1]], c = l[0], d = 1 - c, g = 0; g < $; )
                        n[u] = p[g] * d + f[g] * c,
                        ++g,
                        n[u + 1] = p[g] * d + f[g] * c,
                        ++g,
                        u += _;
                else if (2 == a)
                    for (var p = o[h[0]], f = o[h[1]], y = o[h[2]], m = o[h[3]], c = l[0], T = l[1], d = 1 - c, P = 1 - T, S = P * d, v = P * c, L = T * d, E = T * c, g = 0; g < $; )
                        n[u] = S * p[g] + v * f[g] + L * y[g] + E * m[g],
                        ++g,
                        n[u + 1] = S * p[g] + v * f[g] + L * y[g] + E * m[g],
                        ++g,
                        u += _;
                else if (3 == a)
                    for (var A = o[h[0]], I = o[h[1]], w = o[h[2]], x = o[h[3]], O = o[h[4]], D = o[h[5]], R = o[h[6]], b = o[h[7]], c = l[0], T = l[1], F = l[2], d = 1 - c, P = 1 - T, C = 1 - F, N = C * P * d, B = C * P * c, G = C * T * d, U = C * T * c, Y = F * P * d, k = F * P * c, V = F * T * d, X = F * T * c, g = 0; g < $; )
                        n[u] = N * A[g] + B * I[g] + G * w[g] + U * x[g] + Y * O[g] + k * D[g] + V * R[g] + X * b[g],
                        ++g,
                        n[u + 1] = N * A[g] + B * I[g] + G * w[g] + U * x[g] + Y * O[g] + k * D[g] + V * R[g] + X * b[g],
                        ++g,
                        u += _;
                else if (4 == a)
                    for (var z = o[h[0]], H = o[h[1]], W = o[h[2]], j = o[h[3]], q = o[h[4]], J = o[h[5]], Q = o[h[6]], Z = o[h[7]], K = o[h[8]], tt = o[h[9]], it = o[h[10]], et = o[h[11]], rt = o[h[12]], ot = o[h[13]], nt = o[h[14]], st = o[h[15]], c = l[0], T = l[1], F = l[2], _t = l[3], d = 1 - c, P = 1 - T, C = 1 - F, at = 1 - _t, ht = at * C * P * d, lt = at * C * P * c, $t = at * C * T * d, ut = at * C * T * c, pt = at * F * P * d, ft = at * F * P * c, ct = at * F * T * d, dt = at * F * T * c, gt = _t * C * P * d, yt = _t * C * P * c, mt = _t * C * T * d, Tt = _t * C * T * c, Pt = _t * F * P * d, St = _t * F * P * c, vt = _t * F * T * d, Lt = _t * F * T * c, g = 0; g < $; )
                        n[u] = ht * z[g] + lt * H[g] + $t * W[g] + ut * j[g] + pt * q[g] + ft * J[g] + ct * Q[g] + dt * Z[g] + gt * K[g] + yt * tt[g] + mt * it[g] + Tt * et[g] + Pt * rt[g] + St * ot[g] + vt * nt[g] + Lt * st[g],
                        ++g,
                        n[u + 1] = ht * z[g] + lt * H[g] + $t * W[g] + ut * j[g] + pt * q[g] + ft * J[g] + ct * Q[g] + dt * Z[g] + gt * K[g] + yt * tt[g] + mt * it[g] + Tt * et[g] + Pt * rt[g] + St * ot[g] + vt * nt[g] + Lt * st[g],
                        ++g,
                        u += _;
                else {
                    for (var Mt = 1 << a, Et = new Float32Array(Mt), At = 0; At < Mt; At++) {
                        for (var It = At, wt = 1, xt = 0; xt < a; xt++)
                            wt *= It % 2 == 0 ? 1 - l[xt] : l[xt],
                            It /= 2;
                        Et[At] = wt
                    }
                    for (var Ot = new Float32Array(Mt), Dt = 0; Dt < Mt; Dt++)
                        Ot[Dt] = o[h[Dt]];
                    for (g = 0; g < $; ) {
                        for (var Rt = 0, bt = 0, Ft = g + 1, Dt = 0; Dt < Mt; Dt++)
                            Rt += Et[Dt] * Ot[Dt][g],
                            bt += Et[Dt] * Ot[Dt][Ft];
                        g += 2,
                        n[u] = Rt,
                        n[u + 1] = bt,
                        u += _
                    }
                }
            }
            ,
            T.prototype._$HT = function(t, i) {
                this.x = t,
                this.y = i
            }
            ,
            T.prototype._$HT = function(t) {
                this.x = t.x,
                this.y = t.y
            }
            ,
            P._$ur = -2,
            P._$ES = 500,
            P._$wb = 2,
            P._$8S = 3,
            P._$52 = P._$ES,
            P._$R2 = P._$ES,
            P._$or = function() {
                return P._$52
            }
            ,
            P._$Pr = function() {
                return P._$R2
            }
            ,
            P.prototype.convertClipIDForV2_11 = function(t) {
                var i = [];
                return null == t ? null : 0 == t.length ? null : /,/.test(t) ? i = t.id.split(",") : (i.push(t.id),
                i)
            }
            ,
            P.prototype._$F0 = function(t) {
                this._$gP = t._$nP(),
                this._$dr = t._$nP(),
                this._$GS = t._$nP(),
                this._$qb = t._$6L(),
                this._$Lb = t._$cS(),
                this._$mS = t._$Tb(),
                t.getFormatVersion() >= C._$T7 ? (this.clipID = t._$nP(),
                this.clipIDList = this.convertClipIDForV2_11(this.clipID)) : this.clipIDList = [],
                this._$MS(this._$Lb)
            }
            ,
            P.prototype.getClipIDList = function() {
                return this.clipIDList
            }
            ,
            P.prototype.init = function(t) {}
            ,
            P.prototype._$Nr = function(t, i) {
                if (i._$IS[0] = !1,
                i._$Us = y._$Z2(t, this._$GS, i._$IS, this._$Lb),
                rt._$Zs)
                    ;
                else if (i._$IS[0])
                    return;
                i._$7s = y._$br(t, this._$GS, i._$IS, this._$mS)
            }
            ,
            P.prototype._$2b = function(t, i) {}
            ,
            P.prototype.getDrawDataID = function() {
                return this._$gP
            }
            ,
            P.prototype._$j2 = function(t) {
                this._$gP = t
            }
            ,
            P.prototype.getOpacity = function(t, i) {
                return i._$7s
            }
            ,
            P.prototype._$zS = function(t, i) {
                return i._$Us
            }
            ,
            P.prototype._$MS = function(t) {
                for (var i = t.length - 1; i >= 0; --i) {
                    var e = t[i];
                    e < P._$52 ? P._$52 = e : e > P._$R2 && (P._$R2 = e)
                }
            }
            ,
            P.prototype.getTargetBaseDataID = function() {
                return this._$dr
            }
            ,
            P.prototype._$gs = function(t) {
                this._$dr = t
            }
            ,
            P.prototype._$32 = function() {
                return null != this._$dr && this._$dr != pt._$2o()
            }
            ,
            P.prototype.preDraw = function(t, i, e) {}
            ,
            P.prototype.draw = function(t, i, e) {}
            ,
            P.prototype.getType = function() {}
            ,
            P.prototype._$B2 = function(t, i, e) {}
            ,
            S._$ps = 32,
            S.CLIPPING_PROCESS_NONE = 0,
            S.CLIPPING_PROCESS_OVERWRITE_ALPHA = 1,
            S.CLIPPING_PROCESS_MULTIPLY_ALPHA = 2,
            S.CLIPPING_PROCESS_DRAW = 3,
            S.CLIPPING_PROCESS_CLEAR_ALPHA = 4,
            S.prototype.setChannelFlagAsColor = function(t, i) {
                this.CHANNEL_COLORS[t] = i
            }
            ,
            S.prototype.getChannelFlagAsColor = function(t) {
                return this.CHANNEL_COLORS[t]
            }
            ,
            S.prototype._$ZT = function() {}
            ,
            S.prototype._$Uo = function(t, i, e, r, o, n, s) {}
            ,
            S.prototype._$Rs = function() {
                return -1
            }
            ,
            S.prototype._$Ds = function(t) {}
            ,
            S.prototype.setBaseColor = function(t, i, e, r) {
                t < 0 ? t = 0 : t > 1 && (t = 1),
                i < 0 ? i = 0 : i > 1 && (i = 1),
                e < 0 ? e = 0 : e > 1 && (e = 1),
                r < 0 ? r = 0 : r > 1 && (r = 1),
                this._$lT = t,
                this._$C0 = i,
                this._$tT = e,
                this._$WL = r
            }
            ,
            S.prototype._$WP = function(t) {
                this.culling = t
            }
            ,
            S.prototype.setMatrix = function(t) {
                for (var i = 0; i < 16; i++)
                    this.matrix4x4[i] = t[i]
            }
            ,
            S.prototype._$IT = function() {
                return this.matrix4x4
            }
            ,
            S.prototype.setPremultipliedAlpha = function(t) {
                this.premultipliedAlpha = t
            }
            ,
            S.prototype.isPremultipliedAlpha = function() {
                return this.premultipliedAlpha
            }
            ,
            S.prototype.setAnisotropy = function(t) {
                this.anisotropy = t
            }
            ,
            S.prototype.getAnisotropy = function() {
                return this.anisotropy
            }
            ,
            S.prototype.getClippingProcess = function() {
                return this.clippingProcess
            }
            ,
            S.prototype.setClippingProcess = function(t) {
                this.clippingProcess = t
            }
            ,
            S.prototype.setClipBufPre_clipContextForMask = function(t) {
                this.clipBufPre_clipContextMask = t
            }
            ,
            S.prototype.getClipBufPre_clipContextMask = function() {
                return this.clipBufPre_clipContextMask
            }
            ,
            S.prototype.setClipBufPre_clipContextForDraw = function(t) {
                this.clipBufPre_clipContextDraw = t
            }
            ,
            S.prototype.getClipBufPre_clipContextDraw = function() {
                return this.clipBufPre_clipContextDraw
            }
            ,
            L._$ur = -2,
            L._$c2 = 1,
            L._$_b = 2,
            L.prototype._$F0 = function(t) {
                this._$kP = t._$nP(),
                this._$dr = t._$nP()
            }
            ,
            L.prototype.readV2_opacity = function(t) {
                t.getFormatVersion() >= C.LIVE2D_FORMAT_VERSION_V2_10_SDK2 && (this._$mS = t._$Tb())
            }
            ,
            L.prototype.init = function(t) {}
            ,
            L.prototype._$Nr = function(t, i) {}
            ,
            L.prototype.interpolateOpacity = function(t, i, e, r) {
                null == this._$mS ? e.setInterpolatedOpacity(1) : e.setInterpolatedOpacity(y._$br(t, i, r, this._$mS))
            }
            ,
            L.prototype._$2b = function(t, i) {}
            ,
            L.prototype._$nb = function(t, i, e, r, o, n, s) {}
            ,
            L.prototype.getType = function() {}
            ,
            L.prototype._$gs = function(t) {
                this._$dr = t
            }
            ,
            L.prototype._$a2 = function(t) {
                this._$kP = t
            }
            ,
            L.prototype.getTargetBaseDataID = function() {
                return this._$dr
            }
            ,
            L.prototype.getBaseDataID = function() {
                return this._$kP
            }
            ,
            L.prototype._$32 = function() {
                return null != this._$dr && this._$dr != pt._$2o()
            }
            ,
            M._$CS = M._$W2 = 0,
            M._$Mo = function() {
                return !0
            }
            ,
            M._$XP = function(t) {
                try {
                    for (var i = getTimeMSec(); getTimeMSec() - i < t; )
                        ;
                } catch (t) {
                    t._$Rb()
                }
            }
            ,
            M.getUserTimeMSec = function() {
                return M._$CS == M._$W2 ? M.getSystemTimeMSec() : M._$CS
            }
            ,
            M.setUserTimeMSec = function(t) {
                M._$CS = t
            }
            ,
            M.updateUserTimeMSec = function() {
                return M._$CS = M.getSystemTimeMSec()
            }
            ,
            M.getTimeMSec = function() {
                return (new Date).getTime()
            }
            ,
            M.getSystemTimeMSec = function() {
                return (new Date).getTime()
            }
            ,
            M._$Q = function(t) {}
            ,
            M._$jT = function(t, i, e, r, o) {
                for (var n = 0; n < o; n++)
                    e[r + n] = t[i + n]
            }
            ,
            E._$ds = -2,
            E.prototype._$F0 = function(t) {
                this._$wL = t._$nP(),
                this._$VP = t._$6L(),
                this._$GP = t._$nP()
            }
            ,
            E.prototype.getParamIndex = function(t) {
                return this._$2r != t && (this._$8o = E._$ds),
                this._$8o
            }
            ,
            E.prototype._$Pb = function(t, i) {
                this._$8o = t,
                this._$2r = i
            }
            ,
            E.prototype.getParamID = function() {
                return this._$wL
            }
            ,
            E.prototype._$yP = function(t) {
                this._$wL = t
            }
            ,
            E.prototype._$N2 = function() {
                return this._$VP
            }
            ,
            E.prototype._$d2 = function() {
                return this._$GP
            }
            ,
            E.prototype._$t2 = function(t, i) {
                this._$VP = t,
                this._$GP = i
            }
            ,
            E.prototype._$Lr = function() {
                return this._$O2
            }
            ,
            E.prototype._$wr = function(t) {
                this._$O2 = t
            }
            ,
            E.prototype._$SL = function() {
                return this._$ri
            }
            ,
            E.prototype._$AL = function(t) {
                this._$ri = t
            }
            ,
            A.startsWith = function(t, i, e) {
                var r = i + e.length;
                if (r >= t.length)
                    return !1;
                for (var o = i; o < r; o++)
                    if (A.getChar(t, o) != e.charAt(o - i))
                        return !1;
                return !0
            }
            ,
            A.getChar = function(t, i) {
                return String.fromCharCode(t.getUint8(i))
            }
            ,
            A.createString = function(t, i, e) {
                for (var r = new ArrayBuffer(2 * e), o = new Uint16Array(r), n = 0; n < e; n++)
                    o[n] = t.getUint8(i + n);
                return String.fromCharCode.apply(null, o)
            }
            ,
            A._$LS = function(t, i, e, r) {
                t instanceof ArrayBuffer && (t = new DataView(t));
                var o = e
                  , n = !1
                  , s = !1
                  , _ = 0
                  , a = A.getChar(t, o);
                "-" == a && (n = !0,
                o++);
                for (var h = !1; o < i; o++) {
                    switch (a = A.getChar(t, o)) {
                    case "0":
                        _ *= 10;
                        break;
                    case "1":
                        _ = 10 * _ + 1;
                        break;
                    case "2":
                        _ = 10 * _ + 2;
                        break;
                    case "3":
                        _ = 10 * _ + 3;
                        break;
                    case "4":
                        _ = 10 * _ + 4;
                        break;
                    case "5":
                        _ = 10 * _ + 5;
                        break;
                    case "6":
                        _ = 10 * _ + 6;
                        break;
                    case "7":
                        _ = 10 * _ + 7;
                        break;
                    case "8":
                        _ = 10 * _ + 8;
                        break;
                    case "9":
                        _ = 10 * _ + 9;
                        break;
                    case ".":
                        s = !0,
                        o++,
                        h = !0;
                        break;
                    default:
                        h = !0
                    }
                    if (h)
                        break
                }
                if (s)
                    for (var l = .1, $ = !1; o < i; o++) {
                        switch (a = A.getChar(t, o)) {
                        case "0":
                            break;
                        case "1":
                            _ += 1 * l;
                            break;
                        case "2":
                            _ += 2 * l;
                            break;
                        case "3":
                            _ += 3 * l;
                            break;
                        case "4":
                            _ += 4 * l;
                            break;
                        case "5":
                            _ += 5 * l;
                            break;
                        case "6":
                            _ += 6 * l;
                            break;
                        case "7":
                            _ += 7 * l;
                            break;
                        case "8":
                            _ += 8 * l;
                            break;
                        case "9":
                            _ += 9 * l;
                            break;
                        default:
                            $ = !0
                        }
                        if (l *= .1,
                        $)
                            break
                    }
                return n && (_ = -_),
                r[0] = o,
                _
            }
            ,
            I.prototype._$zP = function() {
                this._$Ob = new Array
            }
            ,
            I.prototype._$F0 = function(t) {
                this._$Ob = t._$nP()
            }
            ,
            I.prototype._$Ur = function(t) {
                if (t._$WS())
                    return !0;
                for (var i = t._$v2(), e = this._$Ob.length - 1; e >= 0; --e) {
                    var r = this._$Ob[e].getParamIndex(i);
                    if (r == E._$ds && (r = t.getParamIndex(this._$Ob[e].getParamID())),
                    t._$Xb(r))
                        return !0
                }
                return !1
            }
            ,
            I.prototype._$Q2 = function(t, i) {
                for (var e, r, o = this._$Ob.length, n = t._$v2(), s = 0, _ = 0; _ < o; _++) {
                    var a = this._$Ob[_];
                    if ((e = a.getParamIndex(n)) == E._$ds && (e = t.getParamIndex(a.getParamID()),
                    a._$Pb(e, n)),
                    e < 0)
                        throw new Exception("err 23242 : " + a.getParamID());
                    var h = e < 0 ? 0 : t.getParamFloat(e);
                    r = a._$N2();
                    var l, $, u = a._$d2(), p = -1, f = 0;
                    if (r < 1)
                        ;
                    else if (1 == r)
                        (l = u[0]) - F._$J < h && h < l + F._$J ? (p = 0,
                        f = 0) : (p = 0,
                        i[0] = !0);
                    else if (l = u[0],
                    h < l - F._$J)
                        p = 0,
                        i[0] = !0;
                    else if (h < l + F._$J)
                        p = 0;
                    else {
                        for (var c = !1, d = 1; d < r; ++d) {
                            if ($ = u[d],
                            h < $ + F._$J) {
                                $ - F._$J < h ? p = d : (p = d - 1,
                                f = (h - l) / ($ - l),
                                s++),
                                c = !0;
                                break
                            }
                            l = $
                        }
                        c || (p = r - 1,
                        f = 0,
                        i[0] = !0)
                    }
                    a._$wr(p),
                    a._$AL(f)
                }
                return s
            }
            ,
            I.prototype._$zr = function(t, i, e) {
                var r = 1 << e;
                r + 1 > F._$Qb && console.log("err 23245\n");
                for (var o = this._$Ob.length, n = 1, s = 1, _ = 0, a = 0; a < r; ++a)
                    t[a] = 0;
                for (var h = 0; h < o; ++h) {
                    var l = this._$Ob[h];
                    if (0 == l._$SL()) {
                        if (($ = l._$Lr() * n) < 0 && rt._$3T)
                            throw new Exception("err 23246");
                        for (a = 0; a < r; ++a)
                            t[a] += $
                    } else {
                        for (var $ = n * l._$Lr(), u = n * (l._$Lr() + 1), a = 0; a < r; ++a)
                            t[a] += (a / s | 0) % 2 == 0 ? $ : u;
                        i[_++] = l._$SL(),
                        s *= 2
                    }
                    n *= l._$N2()
                }
                t[r] = 65535,
                i[_] = -1
            }
            ,
            I.prototype._$h2 = function(t, i, e) {
                for (var r = new Float32Array(i), o = 0; o < i; ++o)
                    r[o] = e[o];
                var n = new E;
                n._$yP(t),
                n._$t2(i, r),
                this._$Ob.push(n)
            }
            ,
            I.prototype._$J2 = function(t) {
                for (var i = t, e = this._$Ob.length, r = 0; r < e; ++r) {
                    var o = this._$Ob[r]
                      , n = o._$N2()
                      , s = i % o._$N2()
                      , _ = o._$d2()[s];
                    console.log("%s[%d]=%7.2f / ", o.getParamID(), s, _),
                    i /= n
                }
                console.log("\n")
            }
            ,
            I.prototype.getParamCount = function() {
                return this._$Ob.length
            }
            ,
            I.prototype._$zs = function() {
                return this._$Ob
            }
            ,
            w.prototype.identity = function() {
                for (var t = 0; t < 16; t++)
                    this.m[t] = t % 5 == 0 ? 1 : 0
            }
            ,
            w.prototype.getArray = function() {
                return this.m
            }
            ,
            w.prototype.getCopyMatrix = function() {
                return new Float32Array(this.m)
            }
            ,
            w.prototype.setMatrix = function(t) {
                if (null != t && 16 == t.length)
                    for (var i = 0; i < 16; i++)
                        this.m[i] = t[i]
            }
            ,
            w.prototype.mult = function(t, i, e) {
                return null == i ? null : (this == i ? this.mult_safe(this.m, t.m, i.m, e) : this.mult_fast(this.m, t.m, i.m, e),
                i)
            }
            ,
            w.prototype.mult_safe = function(t, i, e, r) {
                if (t == e) {
                    var o = new Array(16);
                    this.mult_fast(t, i, o, r);
                    for (var n = 15; n >= 0; --n)
                        e[n] = o[n]
                } else
                    this.mult_fast(t, i, e, r)
            }
            ,
            w.prototype.mult_fast = function(t, i, e, r) {
                r ? (e[0] = t[0] * i[0] + t[4] * i[1] + t[8] * i[2],
                e[4] = t[0] * i[4] + t[4] * i[5] + t[8] * i[6],
                e[8] = t[0] * i[8] + t[4] * i[9] + t[8] * i[10],
                e[12] = t[0] * i[12] + t[4] * i[13] + t[8] * i[14] + t[12],
                e[1] = t[1] * i[0] + t[5] * i[1] + t[9] * i[2],
                e[5] = t[1] * i[4] + t[5] * i[5] + t[9] * i[6],
                e[9] = t[1] * i[8] + t[5] * i[9] + t[9] * i[10],
                e[13] = t[1] * i[12] + t[5] * i[13] + t[9] * i[14] + t[13],
                e[2] = t[2] * i[0] + t[6] * i[1] + t[10] * i[2],
                e[6] = t[2] * i[4] + t[6] * i[5] + t[10] * i[6],
                e[10] = t[2] * i[8] + t[6] * i[9] + t[10] * i[10],
                e[14] = t[2] * i[12] + t[6] * i[13] + t[10] * i[14] + t[14],
                e[3] = e[7] = e[11] = 0,
                e[15] = 1) : (e[0] = t[0] * i[0] + t[4] * i[1] + t[8] * i[2] + t[12] * i[3],
                e[4] = t[0] * i[4] + t[4] * i[5] + t[8] * i[6] + t[12] * i[7],
                e[8] = t[0] * i[8] + t[4] * i[9] + t[8] * i[10] + t[12] * i[11],
                e[12] = t[0] * i[12] + t[4] * i[13] + t[8] * i[14] + t[12] * i[15],
                e[1] = t[1] * i[0] + t[5] * i[1] + t[9] * i[2] + t[13] * i[3],
                e[5] = t[1] * i[4] + t[5] * i[5] + t[9] * i[6] + t[13] * i[7],
                e[9] = t[1] * i[8] + t[5] * i[9] + t[9] * i[10] + t[13] * i[11],
                e[13] = t[1] * i[12] + t[5] * i[13] + t[9] * i[14] + t[13] * i[15],
                e[2] = t[2] * i[0] + t[6] * i[1] + t[10] * i[2] + t[14] * i[3],
                e[6] = t[2] * i[4] + t[6] * i[5] + t[10] * i[6] + t[14] * i[7],
                e[10] = t[2] * i[8] + t[6] * i[9] + t[10] * i[10] + t[14] * i[11],
                e[14] = t[2] * i[12] + t[6] * i[13] + t[10] * i[14] + t[14] * i[15],
                e[3] = t[3] * i[0] + t[7] * i[1] + t[11] * i[2] + t[15] * i[3],
                e[7] = t[3] * i[4] + t[7] * i[5] + t[11] * i[6] + t[15] * i[7],
                e[11] = t[3] * i[8] + t[7] * i[9] + t[11] * i[10] + t[15] * i[11],
                e[15] = t[3] * i[12] + t[7] * i[13] + t[11] * i[14] + t[15] * i[15])
            }
            ,
            w.prototype.translate = function(t, i, e) {
                this.m[12] = this.m[0] * t + this.m[4] * i + this.m[8] * e + this.m[12],
                this.m[13] = this.m[1] * t + this.m[5] * i + this.m[9] * e + this.m[13],
                this.m[14] = this.m[2] * t + this.m[6] * i + this.m[10] * e + this.m[14],
                this.m[15] = this.m[3] * t + this.m[7] * i + this.m[11] * e + this.m[15]
            }
            ,
            w.prototype.scale = function(t, i, e) {
                this.m[0] *= t,
                this.m[4] *= i,
                this.m[8] *= e,
                this.m[1] *= t,
                this.m[5] *= i,
                this.m[9] *= e,
                this.m[2] *= t,
                this.m[6] *= i,
                this.m[10] *= e,
                this.m[3] *= t,
                this.m[7] *= i,
                this.m[11] *= e
            }
            ,
            w.prototype.rotateX = function(t) {
                var i = yt.fcos(t)
                  , e = yt._$9(t)
                  , r = this.m[4];
                this.m[4] = r * i + this.m[8] * e,
                this.m[8] = r * -e + this.m[8] * i,
                r = this.m[5],
                this.m[5] = r * i + this.m[9] * e,
                this.m[9] = r * -e + this.m[9] * i,
                r = this.m[6],
                this.m[6] = r * i + this.m[10] * e,
                this.m[10] = r * -e + this.m[10] * i,
                r = this.m[7],
                this.m[7] = r * i + this.m[11] * e,
                this.m[11] = r * -e + this.m[11] * i
            }
            ,
            w.prototype.rotateY = function(t) {
                var i = yt.fcos(t)
                  , e = yt._$9(t)
                  , r = this.m[0];
                this.m[0] = r * i + this.m[8] * -e,
                this.m[8] = r * e + this.m[8] * i,
                r = this.m[1],
                this.m[1] = r * i + this.m[9] * -e,
                this.m[9] = r * e + this.m[9] * i,
                r = m[2],
                this.m[2] = r * i + this.m[10] * -e,
                this.m[10] = r * e + this.m[10] * i,
                r = m[3],
                this.m[3] = r * i + this.m[11] * -e,
                this.m[11] = r * e + this.m[11] * i
            }
            ,
            w.prototype.rotateZ = function(t) {
                var i = yt.fcos(t)
                  , e = yt._$9(t)
                  , r = this.m[0];
                this.m[0] = r * i + this.m[4] * e,
                this.m[4] = r * -e + this.m[4] * i,
                r = this.m[1],
                this.m[1] = r * i + this.m[5] * e,
                this.m[5] = r * -e + this.m[5] * i,
                r = this.m[2],
                this.m[2] = r * i + this.m[6] * e,
                this.m[6] = r * -e + this.m[6] * i,
                r = this.m[3],
                this.m[3] = r * i + this.m[7] * e,
                this.m[7] = r * -e + this.m[7] * i
            }
            ,
            x.prototype = new Z,
            x._$tP = new Object,
            x._$27 = function() {
                x._$tP.clear()
            }
            ,
            x.getID = function(t) {
                var i = x._$tP[t];
                return null == i && (i = new x(t),
                x._$tP[t] = i),
                i
            }
            ,
            x.prototype._$3s = function() {
                return new x
            }
            ,
            O._$kS = -1,
            O._$pS = 0,
            O._$hb = 1,
            O.STATE_IDENTITY = 0,
            O._$gb = 1,
            O._$fo = 2,
            O._$go = 4,
            O.prototype.transform = function(t, i, e) {
                var r, o, n, s, _, a, h = 0, l = 0;
                switch (this._$hi) {
                default:
                    return;
                case O._$go | O._$fo | O._$gb:
                    for (r = this._$7,
                    o = this._$H,
                    n = this._$k,
                    s = this._$f,
                    _ = this._$g,
                    a = this._$w; --e >= 0; ) {
                        var $ = t[h++]
                          , u = t[h++];
                        i[l++] = r * $ + o * u + n,
                        i[l++] = s * $ + _ * u + a
                    }
                    return;
                case O._$go | O._$fo:
                    for (r = this._$7,
                    o = this._$H,
                    s = this._$f,
                    _ = this._$g; --e >= 0; ) {
                        var $ = t[h++]
                          , u = t[h++];
                        i[l++] = r * $ + o * u,
                        i[l++] = s * $ + _ * u
                    }
                    return;
                case O._$go | O._$gb:
                    for (o = this._$H,
                    n = this._$k,
                    s = this._$f,
                    a = this._$w; --e >= 0; )
                        $ = t[h++],
                        i[l++] = o * t[h++] + n,
                        i[l++] = s * $ + a;
                    return;
                case O._$go:
                    for (o = this._$H,
                    s = this._$f; --e >= 0; )
                        $ = t[h++],
                        i[l++] = o * t[h++],
                        i[l++] = s * $;
                    return;
                case O._$fo | O._$gb:
                    for (r = this._$7,
                    n = this._$k,
                    _ = this._$g,
                    a = this._$w; --e >= 0; )
                        i[l++] = r * t[h++] + n,
                        i[l++] = _ * t[h++] + a;
                    return;
                case O._$fo:
                    for (r = this._$7,
                    _ = this._$g; --e >= 0; )
                        i[l++] = r * t[h++],
                        i[l++] = _ * t[h++];
                    return;
                case O._$gb:
                    for (n = this._$k,
                    a = this._$w; --e >= 0; )
                        i[l++] = t[h++] + n,
                        i[l++] = t[h++] + a;
                    return;
                case O.STATE_IDENTITY:
                    return void (t == i && h == l || M._$jT(t, h, i, l, 2 * e))
                }
            }
            ,
            O.prototype.update = function() {
                0 == this._$H && 0 == this._$f ? 1 == this._$7 && 1 == this._$g ? 0 == this._$k && 0 == this._$w ? (this._$hi = O.STATE_IDENTITY,
                this._$Z = O._$pS) : (this._$hi = O._$gb,
                this._$Z = O._$hb) : 0 == this._$k && 0 == this._$w ? (this._$hi = O._$fo,
                this._$Z = O._$kS) : (this._$hi = O._$fo | O._$gb,
                this._$Z = O._$kS) : 0 == this._$7 && 0 == this._$g ? 0 == this._$k && 0 == this._$w ? (this._$hi = O._$go,
                this._$Z = O._$kS) : (this._$hi = O._$go | O._$gb,
                this._$Z = O._$kS) : 0 == this._$k && 0 == this._$w ? (this._$hi = O._$go | O._$fo,
                this._$Z = O._$kS) : (this._$hi = O._$go | O._$fo | O._$gb,
                this._$Z = O._$kS)
            }
            ,
            O.prototype._$RT = function(t) {
                this._$IT(t);
                var i = t[0]
                  , e = t[2]
                  , r = t[1]
                  , o = t[3]
                  , n = Math.sqrt(i * i + r * r)
                  , s = i * o - e * r;
                0 == n ? rt._$so && console.log("affine._$RT() / rt==0") : (t[0] = n,
                t[1] = s / n,
                t[2] = (r * o + i * e) / s,
                t[3] = Math.atan2(r, i))
            }
            ,
            O.prototype._$ho = function(t, i, e, r) {
                var o = new Float32Array(6)
                  , n = new Float32Array(6);
                t._$RT(o),
                i._$RT(n);
                var s = new Float32Array(6);
                s[0] = o[0] + (n[0] - o[0]) * e,
                s[1] = o[1] + (n[1] - o[1]) * e,
                s[2] = o[2] + (n[2] - o[2]) * e,
                s[3] = o[3] + (n[3] - o[3]) * e,
                s[4] = o[4] + (n[4] - o[4]) * e,
                s[5] = o[5] + (n[5] - o[5]) * e,
                r._$CT(s)
            }
            ,
            O.prototype._$CT = function(t) {
                var i = Math.cos(t[3])
                  , e = Math.sin(t[3]);
                this._$7 = t[0] * i,
                this._$f = t[0] * e,
                this._$H = t[1] * (t[2] * i - e),
                this._$g = t[1] * (t[2] * e + i),
                this._$k = t[4],
                this._$w = t[5],
                this.update()
            }
            ,
            O.prototype._$IT = function(t) {
                t[0] = this._$7,
                t[1] = this._$f,
                t[2] = this._$H,
                t[3] = this._$g,
                t[4] = this._$k,
                t[5] = this._$w
            }
            ,
            D.prototype = new o,
            D._$cs = "VISIBLE:",
            D._$ar = "LAYOUT:",
            D._$Co = 0,
            D._$D2 = [],
            D._$1T = 1,
            D.loadMotion = function(t) {
                var i = new D
                  , e = [0]
                  , r = t.length;
                i._$yT = 0;
                for (var o = 0; o < r; ++o) {
                    var n = 255 & t[o];
                    if ("\n" != n && "\r" != n)
                        if ("#" != n)
                            if ("$" != n) {
                                if ("a" <= n && n <= "z" || "A" <= n && n <= "Z" || "_" == n) {
                                    for (var s = o, _ = -1; o < r && "\r" != (n = 255 & t[o]) && "\n" != n; ++o)
                                        if ("=" == n) {
                                            _ = o;
                                            break
                                        }
                                    if (_ >= 0) {
                                        var a = new b;
                                        A.startsWith(t, s, D._$cs) ? (a._$RP = b._$hs,
                                        a._$4P = new String(t,s,_ - s)) : A.startsWith(t, s, D._$ar) ? (a._$4P = new String(t,s + 7,_ - s - 7),
                                        A.startsWith(t, s + 7, "ANCHOR_X") ? a._$RP = b._$xs : A.startsWith(t, s + 7, "ANCHOR_Y") ? a._$RP = b._$us : A.startsWith(t, s + 7, "SCALE_X") ? a._$RP = b._$qs : A.startsWith(t, s + 7, "SCALE_Y") ? a._$RP = b._$Ys : A.startsWith(t, s + 7, "X") ? a._$RP = b._$ws : A.startsWith(t, s + 7, "Y") && (a._$RP = b._$Ns)) : (a._$RP = b._$Fr,
                                        a._$4P = new String(t,s,_ - s)),
                                        i.motions.push(a);
                                        var h = 0;
                                        for (D._$D2.clear(),
                                        o = _ + 1; o < r && "\r" != (n = 255 & t[o]) && "\n" != n; ++o)
                                            if ("," != n && " " != n && "\t" != n && (u = A._$LS(t, r, o, e),
                                            e[0] > 0)) {
                                                D._$D2.push(u),
                                                h++;
                                                var l = e[0];
                                                if (l < o) {
                                                    console.log("_$n0 _$hi . @Live2DMotion loadMotion()\n");
                                                    break
                                                }
                                                o = l
                                            }
                                        a._$I0 = D._$D2._$BL(),
                                        h > i._$yT && (i._$yT = h)
                                    }
                                }
                            } else {
                                for (var s = o, _ = -1; o < r && "\r" != (n = 255 & t[o]) && "\n" != n; ++o)
                                    if ("=" == n) {
                                        _ = o;
                                        break
                                    }
                                var $ = !1;
                                if (_ >= 0)
                                    for (_ == s + 4 && "f" == t[s + 1] && "p" == t[s + 2] && "s" == t[s + 3] && ($ = !0),
                                    o = _ + 1; o < r && "\r" != (n = 255 & t[o]) && "\n" != n; ++o)
                                        if ("," != n && " " != n && "\t" != n) {
                                            var u = A._$LS(t, r, o, e);
                                            e[0] > 0 && $ && 5 < u && u < 121 && (i._$D0 = u),
                                            o = e[0]
                                        }
                                for (; o < r && "\n" != t[o] && "\r" != t[o]; ++o)
                                    ;
                            }
                        else
                            for (; o < r && "\n" != t[o] && "\r" != t[o]; ++o)
                                ;
                }
                return i._$AS = 1e3 * i._$yT / i._$D0 | 0,
                i
            }
            ,
            D.prototype.getDurationMSec = function() {
                return this._$AS
            }
            ,
            D.prototype.dump = function() {
                for (var t = 0; t < this.motions.length; t++) {
                    var i = this.motions[t];
                    console.log("_$wL[%s] [%d]. ", i._$4P, i._$I0.length);
                    for (var e = 0; e < i._$I0.length && e < 10; e++)
                        console.log("%5.2f ,", i._$I0[e]);
                    console.log("\n")
                }
            }
            ,
            D.prototype.updateParamExe = function(t, i, e, r) {
                for (var o = (i - r._$z2) * this._$D0 / 1e3, n = 0 | o, s = o - n, _ = 0; _ < this.motions.length; _++) {
                    var a = this.motions[_]
                      , h = a._$I0.length
                      , l = a._$4P;
                    if (a._$RP == b._$hs) {
                        var $ = a._$I0[n >= h ? h - 1 : n];
                        t.setParamFloat(l, $)
                    } else if (b._$ws <= a._$RP && a._$RP <= b._$Ys)
                        ;
                    else {
                        var u = t.getParamFloat(l)
                          , p = a._$I0[n >= h ? h - 1 : n]
                          , f = u + (p + (a._$I0[n + 1 >= h ? h - 1 : n + 1] - p) * s - u) * e;
                        t.setParamFloat(l, f)
                    }
                }
                n >= this._$yT && (this._$E ? (r._$z2 = i,
                this.loopFadeIn && (r._$bs = i)) : r._$9L = !0)
            }
            ,
            D.prototype._$r0 = function() {
                return this._$E
            }
            ,
            D.prototype._$aL = function(t) {
                this._$E = t
            }
            ,
            D.prototype.isLoopFadeIn = function() {
                return this.loopFadeIn
            }
            ,
            D.prototype.setLoopFadeIn = function(t) {
                this.loopFadeIn = t
            }
            ,
            R.prototype.clear = function() {
                this.size = 0
            }
            ,
            R.prototype.add = function(t) {
                if (this._$P.length <= this.size) {
                    var i = new Float32Array(2 * this.size);
                    M._$jT(this._$P, 0, i, 0, this.size),
                    this._$P = i
                }
                this._$P[this.size++] = t
            }
            ,
            R.prototype._$BL = function() {
                var t = new Float32Array(this.size);
                return M._$jT(this._$P, 0, t, 0, this.size),
                t
            }
            ,
            b._$Fr = 0,
            b._$hs = 1,
            b._$ws = 100,
            b._$Ns = 101,
            b._$xs = 102,
            b._$us = 103,
            b._$qs = 104,
            b._$Ys = 105,
            F._$Ms = 1,
            F._$Qs = 2,
            F._$i2 = 0,
            F._$No = 2,
            F._$do = F._$Ms,
            F._$Ls = !0,
            F._$1r = 5,
            F._$Qb = 65,
            F._$J = 1e-4,
            F._$FT = .001,
            F._$Ss = 3,
            C._$o7 = 6,
            C._$S7 = 7,
            C._$s7 = 8,
            C._$77 = 9,
            C.LIVE2D_FORMAT_VERSION_V2_10_SDK2 = 10,
            C._$T7 = C.LIVE2D_FORMAT_VERSION_V2_11_SDK2_1 = 11,
            C._$Is = -2004318072,
            C._$h0 = 0,
            C._$4L = 23,
            C._$7P = 33,
            C._$uT = function(t) {
                console.log("_$bo :: _$6 _$mo _$E0 : %d\n", t)
            }
            ,
            C._$9o = function(t) {
                if (t < 40)
                    return C._$uT(t),
                    null;
                if (t < 50)
                    return C._$uT(t),
                    null;
                if (t < 60)
                    return C._$uT(t),
                    null;
                if (t < 100)
                    switch (t) {
                    case 65:
                        return new j;
                    case 66:
                        return new I;
                    case 67:
                        return new E;
                    case 68:
                        return new Y;
                    case 69:
                        return new d;
                    case 70:
                        return new st;
                    default:
                        return C._$uT(t),
                        null
                    }
                else if (t < 150)
                    switch (t) {
                    case 131:
                        return new it;
                    case 133:
                        return new J;
                    case 136:
                        return new h;
                    case 137:
                        return new K;
                    case 142:
                        return new X
                    }
                return C._$uT(t),
                null
            }
            ,
            N._$HP = 0,
            N._$_0 = !0,
            N._$V2 = -1,
            N._$W0 = -1,
            N._$jr = !1,
            N._$ZS = !0,
            N._$tr = -1e6,
            N._$lr = 1e6,
            N._$is = 32,
            N._$e = !1,
            N.prototype.getDrawDataIndex = function(t) {
                for (var i = this._$aS.length - 1; i >= 0; --i)
                    if (null != this._$aS[i] && this._$aS[i].getDrawDataID() == t)
                        return i;
                return -1
            }
            ,
            N.prototype.getDrawData = function(t) {
                if (t instanceof x) {
                    if (null == this._$Bo) {
                        this._$Bo = new Object;
                        for (var i = this._$aS.length, e = 0; e < i; e++) {
                            var r = this._$aS[e]
                              , o = r.getDrawDataID();
                            null != o && (this._$Bo[o] = r)
                        }
                    }
                    return this._$Bo[id]
                }
                return t < this._$aS.length ? this._$aS[t] : null
            }
            ,
            N.prototype.release = function() {
                this._$3S.clear(),
                this._$aS.clear(),
                this._$F2.clear(),
                null != this._$Bo && this._$Bo.clear(),
                this._$db.clear(),
                this._$8b.clear(),
                this._$Hr.clear()
            }
            ,
            N.prototype.init = function() {
                this._$co++,
                this._$F2.length > 0 && this.release();
                for (var t = this._$Ri.getModelImpl(), i = t._$Xr(), r = i.length, o = new Array, n = new Array, s = 0; s < r; ++s) {
                    var _ = i[s];
                    this._$F2.push(_),
                    this._$Hr.push(_.init(this));
                    for (var a = _.getBaseData(), h = a.length, l = 0; l < h; ++l)
                        o.push(a[l]);
                    for (l = 0; l < h; ++l) {
                        var $ = a[l].init(this);
                        $._$l2(s),
                        n.push($)
                    }
                    for (var u = _.getDrawData(), p = u.length, l = 0; l < p; ++l) {
                        var f = u[l]
                          , c = f.init(this);
                        c._$IP = s,
                        this._$aS.push(f),
                        this._$8b.push(c)
                    }
                }
                for (var d = o.length, g = pt._$2o(); ; ) {
                    for (var y = !1, s = 0; s < d; ++s) {
                        var m = o[s];
                        if (null != m) {
                            var T = m.getTargetBaseDataID();
                            (null == T || T == g || this.getBaseDataIndex(T) >= 0) && (this._$3S.push(m),
                            this._$db.push(n[s]),
                            o[s] = null,
                            y = !0)
                        }
                    }
                    if (!y)
                        break
                }
                var P = t._$E2();
                if (null != P) {
                    var S = P._$1s();
                    if (null != S)
                        for (var v = S.length, s = 0; s < v; ++s) {
                            var L = S[s];
                            null != L && this._$02(L.getParamID(), L.getDefaultValue(), L.getMinValue(), L.getMaxValue())
                        }
                }
                this.clipManager = new e(this.dp_webgl),
                this.clipManager.init(this, this._$aS, this._$8b),
                this._$QT = !0
            }
            ,
            N.prototype.update = function() {
                N._$e && n.start("_$zL");
                for (var t = this._$_2.length, i = 0; i < t; i++)
                    this._$_2[i] != this._$vr[i] && (this._$Js[i] = N._$ZS,
                    this._$vr[i] = this._$_2[i]);
                var e = this._$3S.length
                  , r = this._$aS.length
                  , o = V._$or()
                  , s = V._$Pr() - o + 1;
                for ((null == this._$Ws || this._$Ws.length < s) && (this._$Ws = new Int16Array(s),
                this._$Vs = new Int16Array(s)),
                i = 0; i < s; i++)
                    this._$Ws[i] = N._$V2,
                    this._$Vs[i] = N._$V2;
                for ((null == this._$Er || this._$Er.length < r) && (this._$Er = new Int16Array(r)),
                i = 0; i < r; i++)
                    this._$Er[i] = N._$W0;
                N._$e && n.dump("_$zL"),
                N._$e && n.start("_$UL");
                for (var _ = null, a = 0; a < e; ++a) {
                    var h = this._$3S[a]
                      , l = this._$db[a];
                    try {
                        h._$Nr(this, l),
                        h._$2b(this, l)
                    } catch (t) {
                        null == _ && (_ = t)
                    }
                }
                null != _ && N._$_0 && n._$Rb(_),
                N._$e && n.dump("_$UL"),
                N._$e && n.start("_$DL");
                for (var $ = null, u = 0; u < r; ++u) {
                    var p = this._$aS[u]
                      , f = this._$8b[u];
                    try {
                        if (p._$Nr(this, f),
                        f._$u2())
                            continue;
                        p._$2b(this, f);
                        var c, d = Math.floor(p._$zS(this, f) - o);
                        try {
                            c = this._$Vs[d]
                        } catch (t) {
                            console.log("_$li :: %s / %s \t\t\t\t@@_$fS\n", t.toString(), p.getDrawDataID().toString()),
                            d = Math.floor(p._$zS(this, f) - o);
                            continue
                        }
                        c == N._$V2 ? this._$Ws[d] = u : this._$Er[c] = u,
                        this._$Vs[d] = u
                    } catch (t) {
                        null == $ && ($ = t,
                        rt._$sT(rt._$H7))
                    }
                }
                for (null != $ && N._$_0 && n._$Rb($),
                N._$e && n.dump("_$DL"),
                N._$e && n.start("_$eL"),
                i = this._$Js.length - 1; i >= 0; i--)
                    this._$Js[i] = N._$jr;
                return this._$QT = !1,
                N._$e && n.dump("_$eL"),
                !1
            }
            ,
            N.prototype.preDraw = function(t) {
                null != this.clipManager && (t._$ZT(),
                this.clipManager.setupClip(this, t))
            }
            ,
            N.prototype.draw = function(t) {
                if (null != this._$Ws) {
                    var i = this._$Ws.length;
                    t._$ZT();
                    for (var e = 0; e < i; ++e) {
                        var r = this._$Ws[e];
                        if (r != N._$V2)
                            for (; ; ) {
                                var o = this._$aS[r]
                                  , s = this._$8b[r];
                                if (s._$yo()) {
                                    var _ = s._$IP
                                      , a = this._$Hr[_];
                                    s._$VS = a.getPartsOpacity(),
                                    o.draw(t, this, s)
                                }
                                var h = this._$Er[r];
                                if (h <= r || h == N._$W0)
                                    break;
                                r = h
                            }
                    }
                } else
                    n._$li("call _$Ri.update() before _$Ri.draw() ")
            }
            ,
            N.prototype.getParamIndex = function(t) {
                for (var i = this._$pb.length - 1; i >= 0; --i)
                    if (this._$pb[i] == t)
                        return i;
                return this._$02(t, 0, N._$tr, N._$lr)
            }
            ,
            N.prototype._$BS = function(t) {
                return this.getBaseDataIndex(t)
            }
            ,
            N.prototype.getBaseDataIndex = function(t) {
                for (var i = this._$3S.length - 1; i >= 0; --i)
                    if (null != this._$3S[i] && this._$3S[i].getBaseDataID() == t)
                        return i;
                return -1
            }
            ,
            N.prototype._$UT = function(t, i) {
                var e = new Float32Array(i);
                return M._$jT(t, 0, e, 0, t.length),
                e
            }
            ,
            N.prototype._$02 = function(t, i, e, r) {
                if (this._$qo >= this._$pb.length) {
                    var o = this._$pb.length
                      , n = new Array(2 * o);
                    M._$jT(this._$pb, 0, n, 0, o),
                    this._$pb = n,
                    this._$_2 = this._$UT(this._$_2, 2 * o),
                    this._$vr = this._$UT(this._$vr, 2 * o),
                    this._$Rr = this._$UT(this._$Rr, 2 * o),
                    this._$Or = this._$UT(this._$Or, 2 * o);
                    var s = new Array;
                    M._$jT(this._$Js, 0, s, 0, o),
                    this._$Js = s
                }
                return this._$pb[this._$qo] = t,
                this._$_2[this._$qo] = i,
                this._$vr[this._$qo] = i,
                this._$Rr[this._$qo] = e,
                this._$Or[this._$qo] = r,
                this._$Js[this._$qo] = N._$ZS,
                this._$qo++
            }
            ,
            N.prototype._$Zo = function(t, i) {
                this._$3S[t] = i
            }
            ,
            N.prototype.setParamFloat = function(t, i) {
                i < this._$Rr[t] && (i = this._$Rr[t]),
                i > this._$Or[t] && (i = this._$Or[t]),
                this._$_2[t] = i
            }
            ,
            N.prototype.loadParam = function() {
                var t = this._$_2.length;
                t > this._$fs.length && (t = this._$fs.length),
                M._$jT(this._$fs, 0, this._$_2, 0, t)
            }
            ,
            N.prototype.saveParam = function() {
                var t = this._$_2.length;
                t > this._$fs.length && (this._$fs = new Float32Array(t)),
                M._$jT(this._$_2, 0, this._$fs, 0, t)
            }
            ,
            N.prototype._$v2 = function() {
                return this._$co
            }
            ,
            N.prototype._$WS = function() {
                return this._$QT
            }
            ,
            N.prototype._$Xb = function(t) {
                return this._$Js[t] == N._$ZS
            }
            ,
            N.prototype._$vs = function() {
                return this._$Es
            }
            ,
            N.prototype._$Tr = function() {
                return this._$ZP
            }
            ,
            N.prototype.getBaseData = function(t) {
                return this._$3S[t]
            }
            ,
            N.prototype.getParamFloat = function(t) {
                return this._$_2[t]
            }
            ,
            N.prototype.getParamMax = function(t) {
                return this._$Or[t]
            }
            ,
            N.prototype.getParamMin = function(t) {
                return this._$Rr[t]
            }
            ,
            N.prototype.setPartsOpacity = function(t, i) {
                this._$Hr[t].setPartsOpacity(i)
            }
            ,
            N.prototype.getPartsOpacity = function(t) {
                return this._$Hr[t].getPartsOpacity()
            }
            ,
            N.prototype.getPartsDataIndex = function(t) {
                for (var i = this._$F2.length - 1; i >= 0; --i)
                    if (null != this._$F2[i] && this._$F2[i]._$p2() == t)
                        return i;
                return -1
            }
            ,
            N.prototype._$q2 = function(t) {
                return this._$db[t]
            }
            ,
            N.prototype._$C2 = function(t) {
                return this._$8b[t]
            }
            ,
            N.prototype._$Bb = function(t) {
                return this._$Hr[t]
            }
            ,
            N.prototype._$5s = function(t, i) {
                for (var e = this._$Ws.length, r = t, o = 0; o < e; ++o) {
                    var n = this._$Ws[o];
                    if (n != N._$V2)
                        for (; ; ) {
                            var s = this._$8b[n];
                            s._$yo() && (s._$GT()._$B2(this, s, r),
                            r += i);
                            var _ = this._$Er[n];
                            if (_ <= n || _ == N._$W0)
                                break;
                            n = _
                        }
                }
            }
            ,
            N.prototype.setDrawParam = function(t) {
                this.dp_webgl = t
            }
            ,
            N.prototype.getDrawParam = function() {
                return this.dp_webgl
            }
            ,
            B._$0T = function(t) {
                return B._$0T(new _$5(t))
            }
            ,
            B._$0T = function(t) {
                if (!t.exists())
                    throw new _$ls(t._$3b());
                for (var i, e = t.length(), r = new Int8Array(e), o = new _$Xs(new _$kb(t),8192), n = 0; (i = o.read(r, n, e - n)) > 0; )
                    n += i;
                return r
            }
            ,
            B._$C = function(t) {
                var i = null
                  , e = null;
                try {
                    i = t instanceof Array ? t : new _$Xs(t,8192),
                    e = new _$js;
                    for (var r, o = new Int8Array(1e3); (r = i.read(o)) > 0; )
                        e.write(o, 0, r);
                    return e._$TS()
                } finally {
                    null != t && t.close(),
                    null != e && (e.flush(),
                    e.close())
                }
            }
            ,
            G.prototype._$T2 = function() {
                return M.getUserTimeMSec() + Math._$10() * (2 * this._$Br - 1)
            }
            ,
            G.prototype._$uo = function(t) {
                this._$Br = t
            }
            ,
            G.prototype._$QS = function(t, i, e) {
                this._$Dr = t,
                this._$Cb = i,
                this._$mr = e
            }
            ,
            G.prototype._$7T = function(t) {
                var i, e = M.getUserTimeMSec(), r = 0;
                switch (this._$_L) {
                case STATE_CLOSING:
                    (r = (e - this._$bb) / this._$Dr) >= 1 && (r = 1,
                    this._$_L = St.STATE_CLOSED,
                    this._$bb = e),
                    i = 1 - r;
                    break;
                case STATE_CLOSED:
                    (r = (e - this._$bb) / this._$Cb) >= 1 && (this._$_L = St.STATE_OPENING,
                    this._$bb = e),
                    i = 0;
                    break;
                case STATE_OPENING:
                    (r = (e - this._$bb) / this._$mr) >= 1 && (r = 1,
                    this._$_L = St.STATE_INTERVAL,
                    this._$12 = this._$T2()),
                    i = r;
                    break;
                case STATE_INTERVAL:
                    this._$12 < e && (this._$_L = St.STATE_CLOSING,
                    this._$bb = e),
                    i = 1;
                    break;
                case STATE_FIRST:
                default:
                    this._$_L = St.STATE_INTERVAL,
                    this._$12 = this._$T2(),
                    i = 1
                }
                this._$jo || (i = -i),
                t.setParamFloat(this._$iL, i),
                t.setParamFloat(this._$0L, i)
            }
            ;
            var St = function() {};
            St.STATE_FIRST = "STATE_FIRST",
            St.STATE_INTERVAL = "STATE_INTERVAL",
            St.STATE_CLOSING = "STATE_CLOSING",
            St.STATE_CLOSED = "STATE_CLOSED",
            St.STATE_OPENING = "STATE_OPENING",
            U.prototype = new S,
            U._$As = 32,
            U._$Gr = !1,
            U._$NT = null,
            U._$vS = null,
            U._$no = null,
            U._$9r = function(t) {
                return new Float32Array(t)
            }
            ,
            U._$vb = function(t) {
                return new Int16Array(t)
            }
            ,
            U._$cr = function(t, i) {
                return null == t || t._$yL() < i.length ? ((t = U._$9r(2 * i.length)).put(i),
                t._$oT(0)) : (t.clear(),
                t.put(i),
                t._$oT(0)),
                t
            }
            ,
            U._$mb = function(t, i) {
                return null == t || t._$yL() < i.length ? ((t = U._$vb(2 * i.length)).put(i),
                t._$oT(0)) : (t.clear(),
                t.put(i),
                t._$oT(0)),
                t
            }
            ,
            U._$Hs = function() {
                return U._$Gr
            }
            ,
            U._$as = function(t) {
                U._$Gr = t
            }
            ,
            U.prototype.setGL = function(t) {
                this.gl = t
            }
            ,
            U.prototype.setTransform = function(t) {
                this.transform = t
            }
            ,
            U.prototype._$ZT = function() {}
            ,
            U.prototype._$Uo = function(t, i, e, r, o, n, s, _) {
                if (!(n < .01)) {
                    var a = this._$U2[t]
                      , h = n > .9 ? rt.EXPAND_W : 0;
                    this.gl.drawElements(a, e, r, o, n, h, this.transform, _)
                }
            }
            ,
            U.prototype._$Rs = function() {
                throw new Error("_$Rs")
            }
            ,
            U.prototype._$Ds = function(t) {
                throw new Error("_$Ds")
            }
            ,
            U.prototype._$K2 = function() {
                for (var t = 0; t < this._$sb.length; t++)
                    0 != this._$sb[t] && (this.gl._$Sr(1, this._$sb, t),
                    this._$sb[t] = 0)
            }
            ,
            U.prototype.setTexture = function(t, i) {
                this._$sb.length < t + 1 && this._$nS(t),
                this._$sb[t] = i
            }
            ,
            U.prototype.setTexture = function(t, i) {
                this._$sb.length < t + 1 && this._$nS(t),
                this._$U2[t] = i
            }
            ,
            U.prototype._$nS = function(t) {
                var i = Math.max(2 * this._$sb.length, t + 1 + 10)
                  , e = new Int32Array(i);
                M._$jT(this._$sb, 0, e, 0, this._$sb.length),
                this._$sb = e;
                var r = new Array;
                M._$jT(this._$U2, 0, r, 0, this._$U2.length),
                this._$U2 = r
            }
            ,
            Y.prototype = new L,
            Y._$Xo = new Float32Array(2),
            Y._$io = new Float32Array(2),
            Y._$0o = new Float32Array(2),
            Y._$Lo = new Float32Array(2),
            Y._$To = new Float32Array(2),
            Y._$Po = new Float32Array(2),
            Y._$gT = new Array,
            Y.prototype._$zP = function() {
                this._$GS = new I,
                this._$GS._$zP(),
                this._$Y0 = new Array
            }
            ,
            Y.prototype.getType = function() {
                return L._$c2
            }
            ,
            Y.prototype._$F0 = function(t) {
                L.prototype._$F0.call(this, t),
                this._$GS = t._$nP(),
                this._$Y0 = t._$nP(),
                L.prototype.readV2_opacity.call(this, t)
            }
            ,
            Y.prototype.init = function(t) {
                var i = new k(this);
                return i._$Yr = new d,
                this._$32() && (i._$Wr = new d),
                i
            }
            ,
            Y.prototype._$Nr = function(t, i) {
                this != i._$GT() && console.log("### assert!! ### ");
                var e = i;
                if (this._$GS._$Ur(t)) {
                    var r = Y._$gT;
                    r[0] = !1;
                    var o = this._$GS._$Q2(t, r);
                    i._$Ib(r[0]),
                    this.interpolateOpacity(t, this._$GS, i, r);
                    var n = t._$vs()
                      , s = t._$Tr();
                    if (this._$GS._$zr(n, s, o),
                    o <= 0)
                        _ = this._$Y0[n[0]],
                        e._$Yr.init(_);
                    else if (1 == o) {
                        var _ = this._$Y0[n[0]]
                          , a = this._$Y0[n[1]]
                          , h = s[0];
                        e._$Yr._$fL = _._$fL + (a._$fL - _._$fL) * h,
                        e._$Yr._$gL = _._$gL + (a._$gL - _._$gL) * h,
                        e._$Yr._$B0 = _._$B0 + (a._$B0 - _._$B0) * h,
                        e._$Yr._$z0 = _._$z0 + (a._$z0 - _._$z0) * h,
                        e._$Yr._$qT = _._$qT + (a._$qT - _._$qT) * h
                    } else if (2 == o) {
                        var _ = this._$Y0[n[0]]
                          , a = this._$Y0[n[1]]
                          , l = this._$Y0[n[2]]
                          , $ = this._$Y0[n[3]]
                          , h = s[0]
                          , u = s[1]
                          , p = _._$fL + (a._$fL - _._$fL) * h
                          , f = l._$fL + ($._$fL - l._$fL) * h;
                        e._$Yr._$fL = p + (f - p) * u,
                        p = _._$gL + (a._$gL - _._$gL) * h,
                        f = l._$gL + ($._$gL - l._$gL) * h,
                        e._$Yr._$gL = p + (f - p) * u,
                        p = _._$B0 + (a._$B0 - _._$B0) * h,
                        f = l._$B0 + ($._$B0 - l._$B0) * h,
                        e._$Yr._$B0 = p + (f - p) * u,
                        p = _._$z0 + (a._$z0 - _._$z0) * h,
                        f = l._$z0 + ($._$z0 - l._$z0) * h,
                        e._$Yr._$z0 = p + (f - p) * u,
                        p = _._$qT + (a._$qT - _._$qT) * h,
                        f = l._$qT + ($._$qT - l._$qT) * h,
                        e._$Yr._$qT = p + (f - p) * u
                    } else if (3 == o) {
                        var c = this._$Y0[n[0]]
                          , d = this._$Y0[n[1]]
                          , g = this._$Y0[n[2]]
                          , y = this._$Y0[n[3]]
                          , m = this._$Y0[n[4]]
                          , T = this._$Y0[n[5]]
                          , P = this._$Y0[n[6]]
                          , S = this._$Y0[n[7]]
                          , h = s[0]
                          , u = s[1]
                          , v = s[2]
                          , p = c._$fL + (d._$fL - c._$fL) * h
                          , f = g._$fL + (y._$fL - g._$fL) * h
                          , L = m._$fL + (T._$fL - m._$fL) * h
                          , M = P._$fL + (S._$fL - P._$fL) * h;
                        e._$Yr._$fL = (1 - v) * (p + (f - p) * u) + v * (L + (M - L) * u),
                        p = c._$gL + (d._$gL - c._$gL) * h,
                        f = g._$gL + (y._$gL - g._$gL) * h,
                        L = m._$gL + (T._$gL - m._$gL) * h,
                        M = P._$gL + (S._$gL - P._$gL) * h,
                        e._$Yr._$gL = (1 - v) * (p + (f - p) * u) + v * (L + (M - L) * u),
                        p = c._$B0 + (d._$B0 - c._$B0) * h,
                        f = g._$B0 + (y._$B0 - g._$B0) * h,
                        L = m._$B0 + (T._$B0 - m._$B0) * h,
                        M = P._$B0 + (S._$B0 - P._$B0) * h,
                        e._$Yr._$B0 = (1 - v) * (p + (f - p) * u) + v * (L + (M - L) * u),
                        p = c._$z0 + (d._$z0 - c._$z0) * h,
                        f = g._$z0 + (y._$z0 - g._$z0) * h,
                        L = m._$z0 + (T._$z0 - m._$z0) * h,
                        M = P._$z0 + (S._$z0 - P._$z0) * h,
                        e._$Yr._$z0 = (1 - v) * (p + (f - p) * u) + v * (L + (M - L) * u),
                        p = c._$qT + (d._$qT - c._$qT) * h,
                        f = g._$qT + (y._$qT - g._$qT) * h,
                        L = m._$qT + (T._$qT - m._$qT) * h,
                        M = P._$qT + (S._$qT - P._$qT) * h,
                        e._$Yr._$qT = (1 - v) * (p + (f - p) * u) + v * (L + (M - L) * u)
                    } else if (4 == o) {
                        var E = this._$Y0[n[0]]
                          , A = this._$Y0[n[1]]
                          , I = this._$Y0[n[2]]
                          , w = this._$Y0[n[3]]
                          , x = this._$Y0[n[4]]
                          , O = this._$Y0[n[5]]
                          , D = this._$Y0[n[6]]
                          , R = this._$Y0[n[7]]
                          , b = this._$Y0[n[8]]
                          , F = this._$Y0[n[9]]
                          , C = this._$Y0[n[10]]
                          , N = this._$Y0[n[11]]
                          , B = this._$Y0[n[12]]
                          , G = this._$Y0[n[13]]
                          , U = this._$Y0[n[14]]
                          , k = this._$Y0[n[15]]
                          , h = s[0]
                          , u = s[1]
                          , v = s[2]
                          , V = s[3]
                          , p = E._$fL + (A._$fL - E._$fL) * h
                          , f = I._$fL + (w._$fL - I._$fL) * h
                          , L = x._$fL + (O._$fL - x._$fL) * h
                          , M = D._$fL + (R._$fL - D._$fL) * h
                          , X = b._$fL + (F._$fL - b._$fL) * h
                          , z = C._$fL + (N._$fL - C._$fL) * h
                          , H = B._$fL + (G._$fL - B._$fL) * h
                          , W = U._$fL + (k._$fL - U._$fL) * h;
                        e._$Yr._$fL = (1 - V) * ((1 - v) * (p + (f - p) * u) + v * (L + (M - L) * u)) + V * ((1 - v) * (X + (z - X) * u) + v * (H + (W - H) * u)),
                        p = E._$gL + (A._$gL - E._$gL) * h,
                        f = I._$gL + (w._$gL - I._$gL) * h,
                        L = x._$gL + (O._$gL - x._$gL) * h,
                        M = D._$gL + (R._$gL - D._$gL) * h,
                        X = b._$gL + (F._$gL - b._$gL) * h,
                        z = C._$gL + (N._$gL - C._$gL) * h,
                        H = B._$gL + (G._$gL - B._$gL) * h,
                        W = U._$gL + (k._$gL - U._$gL) * h,
                        e._$Yr._$gL = (1 - V) * ((1 - v) * (p + (f - p) * u) + v * (L + (M - L) * u)) + V * ((1 - v) * (X + (z - X) * u) + v * (H + (W - H) * u)),
                        p = E._$B0 + (A._$B0 - E._$B0) * h,
                        f = I._$B0 + (w._$B0 - I._$B0) * h,
                        L = x._$B0 + (O._$B0 - x._$B0) * h,
                        M = D._$B0 + (R._$B0 - D._$B0) * h,
                        X = b._$B0 + (F._$B0 - b._$B0) * h,
                        z = C._$B0 + (N._$B0 - C._$B0) * h,
                        H = B._$B0 + (G._$B0 - B._$B0) * h,
                        W = U._$B0 + (k._$B0 - U._$B0) * h,
                        e._$Yr._$B0 = (1 - V) * ((1 - v) * (p + (f - p) * u) + v * (L + (M - L) * u)) + V * ((1 - v) * (X + (z - X) * u) + v * (H + (W - H) * u)),
                        p = E._$z0 + (A._$z0 - E._$z0) * h,
                        f = I._$z0 + (w._$z0 - I._$z0) * h,
                        L = x._$z0 + (O._$z0 - x._$z0) * h,
                        M = D._$z0 + (R._$z0 - D._$z0) * h,
                        X = b._$z0 + (F._$z0 - b._$z0) * h,
                        z = C._$z0 + (N._$z0 - C._$z0) * h,
                        H = B._$z0 + (G._$z0 - B._$z0) * h,
                        W = U._$z0 + (k._$z0 - U._$z0) * h,
                        e._$Yr._$z0 = (1 - V) * ((1 - v) * (p + (f - p) * u) + v * (L + (M - L) * u)) + V * ((1 - v) * (X + (z - X) * u) + v * (H + (W - H) * u)),
                        p = E._$qT + (A._$qT - E._$qT) * h,
                        f = I._$qT + (w._$qT - I._$qT) * h,
                        L = x._$qT + (O._$qT - x._$qT) * h,
                        M = D._$qT + (R._$qT - D._$qT) * h,
                        X = b._$qT + (F._$qT - b._$qT) * h,
                        z = C._$qT + (N._$qT - C._$qT) * h,
                        H = B._$qT + (G._$qT - B._$qT) * h,
                        W = U._$qT + (k._$qT - U._$qT) * h,
                        e._$Yr._$qT = (1 - V) * ((1 - v) * (p + (f - p) * u) + v * (L + (M - L) * u)) + V * ((1 - v) * (X + (z - X) * u) + v * (H + (W - H) * u))
                    } else {
                        for (var j = 0 | Math.pow(2, o), q = new Float32Array(j), J = 0; J < j; J++) {
                            for (var Q = J, Z = 1, K = 0; K < o; K++)
                                Z *= Q % 2 == 0 ? 1 - s[K] : s[K],
                                Q /= 2;
                            q[J] = Z
                        }
                        for (var tt = new Array, it = 0; it < j; it++)
                            tt[it] = this._$Y0[n[it]];
                        for (var et = 0, rt = 0, ot = 0, nt = 0, st = 0, it = 0; it < j; it++)
                            et += q[it] * tt[it]._$fL,
                            rt += q[it] * tt[it]._$gL,
                            ot += q[it] * tt[it]._$B0,
                            nt += q[it] * tt[it]._$z0,
                            st += q[it] * tt[it]._$qT;
                        e._$Yr._$fL = et,
                        e._$Yr._$gL = rt,
                        e._$Yr._$B0 = ot,
                        e._$Yr._$z0 = nt,
                        e._$Yr._$qT = st
                    }
                    _ = this._$Y0[n[0]],
                    e._$Yr.reflectX = _.reflectX,
                    e._$Yr.reflectY = _.reflectY
                }
            }
            ,
            Y.prototype._$2b = function(t, i) {
                this != i._$GT() && console.log("### assert!! ### ");
                var e = i;
                if (e._$hS(!0),
                this._$32()) {
                    var r = this.getTargetBaseDataID();
                    if (e._$8r == L._$ur && (e._$8r = t.getBaseDataIndex(r)),
                    e._$8r < 0)
                        rt._$so && n._$li("_$L _$0P _$G :: %s", r),
                        e._$hS(!1);
                    else {
                        var o = t.getBaseData(e._$8r);
                        if (null != o) {
                            var s = t._$q2(e._$8r)
                              , _ = Y._$Xo;
                            _[0] = e._$Yr._$fL,
                            _[1] = e._$Yr._$gL;
                            var a = Y._$io;
                            a[0] = 0,
                            a[1] = -.1,
                            s._$GT().getType() == L._$c2 ? a[1] = -10 : a[1] = -.1;
                            var h = Y._$0o;
                            this._$Jr(t, o, s, _, a, h);
                            var l = yt._$92(a, h);
                            o._$nb(t, s, _, _, 1, 0, 2),
                            e._$Wr._$fL = _[0],
                            e._$Wr._$gL = _[1],
                            e._$Wr._$B0 = e._$Yr._$B0,
                            e._$Wr._$z0 = e._$Yr._$z0,
                            e._$Wr._$qT = e._$Yr._$qT - l * yt._$NS;
                            var $ = s.getTotalScale();
                            e.setTotalScale_notForClient($ * e._$Wr._$B0);
                            var u = s.getTotalOpacity();
                            e.setTotalOpacity(u * e.getInterpolatedOpacity()),
                            e._$Wr.reflectX = e._$Yr.reflectX,
                            e._$Wr.reflectY = e._$Yr.reflectY,
                            e._$hS(s._$yo())
                        } else
                            e._$hS(!1)
                    }
                } else
                    e.setTotalScale_notForClient(e._$Yr._$B0),
                    e.setTotalOpacity(e.getInterpolatedOpacity())
            }
            ,
            Y.prototype._$nb = function(t, i, e, r, o, n, s) {
                this != i._$GT() && console.log("### assert!! ### ");
                for (var _, a, h = i, l = null != h._$Wr ? h._$Wr : h._$Yr, $ = Math.sin(yt._$bS * l._$qT), u = Math.cos(yt._$bS * l._$qT), p = h.getTotalScale(), f = l.reflectX ? -1 : 1, c = l.reflectY ? -1 : 1, d = u * p * f, g = -$ * p * c, y = $ * p * f, m = u * p * c, T = l._$fL, P = l._$gL, S = o * s, v = n; v < S; v += s)
                    _ = e[v],
                    a = e[v + 1],
                    r[v] = d * _ + g * a + T,
                    r[v + 1] = y * _ + m * a + P
            }
            ,
            Y.prototype._$Jr = function(t, i, e, r, o, n) {
                i != e._$GT() && console.log("### assert!! ### ");
                var s = Y._$Lo;
                Y._$Lo[0] = r[0],
                Y._$Lo[1] = r[1],
                i._$nb(t, e, s, s, 1, 0, 2);
                for (var _ = Y._$To, a = Y._$Po, h = 1, l = 0; l < 10; l++) {
                    if (a[0] = r[0] + h * o[0],
                    a[1] = r[1] + h * o[1],
                    i._$nb(t, e, a, _, 1, 0, 2),
                    _[0] -= s[0],
                    _[1] -= s[1],
                    0 != _[0] || 0 != _[1])
                        return n[0] = _[0],
                        void (n[1] = _[1]);
                    if (a[0] = r[0] - h * o[0],
                    a[1] = r[1] - h * o[1],
                    i._$nb(t, e, a, _, 1, 0, 2),
                    _[0] -= s[0],
                    _[1] -= s[1],
                    0 != _[0] || 0 != _[1])
                        return _[0] = -_[0],
                        _[0] = -_[0],
                        n[0] = _[0],
                        void (n[1] = _[1]);
                    h *= .1
                }
                rt._$so && console.log("_$L0 to transform _$SP\n")
            }
            ,
            k.prototype = new et,
            V.prototype = new P,
            V._$ur = -2,
            V._$ES = 500,
            V._$wb = 2,
            V._$8S = 3,
            V._$os = 4,
            V._$52 = V._$ES,
            V._$R2 = V._$ES,
            V._$Sb = function(t) {
                for (var i = t.length - 1; i >= 0; --i) {
                    var e = t[i];
                    e < V._$52 ? V._$52 = e : e > V._$R2 && (V._$R2 = e)
                }
            }
            ,
            V._$or = function() {
                return V._$52
            }
            ,
            V._$Pr = function() {
                return V._$R2
            }
            ,
            V.prototype._$F0 = function(t) {
                this._$gP = t._$nP(),
                this._$dr = t._$nP(),
                this._$GS = t._$nP(),
                this._$qb = t._$6L(),
                this._$Lb = t._$cS(),
                this._$mS = t._$Tb(),
                t.getFormatVersion() >= C._$T7 ? (this.clipID = t._$nP(),
                this.clipIDList = this.convertClipIDForV2_11(this.clipID)) : this.clipIDList = null,
                V._$Sb(this._$Lb)
            }
            ,
            V.prototype.getClipIDList = function() {
                return this.clipIDList
            }
            ,
            V.prototype._$Nr = function(t, i) {
                if (i._$IS[0] = !1,
                i._$Us = y._$Z2(t, this._$GS, i._$IS, this._$Lb),
                rt._$Zs)
                    ;
                else if (i._$IS[0])
                    return;
                i._$7s = y._$br(t, this._$GS, i._$IS, this._$mS)
            }
            ,
            V.prototype._$2b = function(t) {}
            ,
            V.prototype.getDrawDataID = function() {
                return this._$gP
            }
            ,
            V.prototype._$j2 = function(t) {
                this._$gP = t
            }
            ,
            V.prototype.getOpacity = function(t, i) {
                return i._$7s
            }
            ,
            V.prototype._$zS = function(t, i) {
                return i._$Us
            }
            ,
            V.prototype.getTargetBaseDataID = function() {
                return this._$dr
            }
            ,
            V.prototype._$gs = function(t) {
                this._$dr = t
            }
            ,
            V.prototype._$32 = function() {
                return null != this._$dr && this._$dr != pt._$2o()
            }
            ,
            V.prototype.getType = function() {}
            ,
            X._$42 = 0,
            X.prototype._$1b = function() {
                return this._$3S
            }
            ,
            X.prototype.getDrawDataList = function() {
                return this._$aS
            }
            ,
            X.prototype._$F0 = function(t) {
                this._$NL = t._$nP(),
                this._$aS = t._$nP(),
                this._$3S = t._$nP()
            }
            ,
            X.prototype._$kr = function(t) {
                t._$Zo(this._$3S),
                t._$xo(this._$aS),
                this._$3S = null,
                this._$aS = null
            }
            ,
            z.prototype = new i,
            z.loadModel = function(t) {
                var e = new z;
                return i._$62(e, t),
                e
            }
            ,
            z.loadModel = function(t) {
                var e = new z;
                return i._$62(e, t),
                e
            }
            ,
            z._$to = function() {
                return new z
            }
            ,
            z._$er = function(t) {
                var i = new _$5("../_$_r/_$t0/_$Ri/_$_P._$d");
                if (0 == i.exists())
                    throw new _$ls("_$t0 _$_ _$6 _$Ui :: " + i._$PL());
                for (var e = ["../_$_r/_$t0/_$Ri/_$_P.512/_$CP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$vP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$EP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$pP._$1"], r = z.loadModel(i._$3b()), o = 0; o < e.length; o++) {
                    var n = new _$5(e[o]);
                    if (0 == n.exists())
                        throw new _$ls("_$t0 _$_ _$6 _$Ui :: " + n._$PL());
                    r.setTexture(o, _$nL._$_o(t, n._$3b()))
                }
                return r
            }
            ,
            z.prototype.setGL = function(t) {
                this._$zo.setGL(t)
            }
            ,
            z.prototype.setTransform = function(t) {
                this._$zo.setTransform(t)
            }
            ,
            z.prototype.draw = function() {
                this._$5S.draw(this._$zo)
            }
            ,
            z.prototype._$K2 = function() {
                this._$zo._$K2()
            }
            ,
            z.prototype.setTexture = function(t, i) {
                null == this._$zo && n._$li("_$Yi for QT _$ki / _$XS() is _$6 _$ui!!"),
                this._$zo.setTexture(t, i)
            }
            ,
            z.prototype.setTexture = function(t, i) {
                null == this._$zo && n._$li("_$Yi for QT _$ki / _$XS() is _$6 _$ui!!"),
                this._$zo.setTexture(t, i)
            }
            ,
            z.prototype._$Rs = function() {
                return this._$zo._$Rs()
            }
            ,
            z.prototype._$Ds = function(t) {
                this._$zo._$Ds(t)
            }
            ,
            z.prototype.getDrawParam = function() {
                return this._$zo
            }
            ,
            H.prototype = new o,
            H._$cs = "VISIBLE:",
            H._$ar = "LAYOUT:",
            H.MTN_PREFIX_FADEIN = "FADEIN:",
            H.MTN_PREFIX_FADEOUT = "FADEOUT:",
            H._$Co = 0,
            H._$1T = 1,
            H.loadMotion = function(t) {
                var i = B._$C(t);
                return H.loadMotion(i)
            }
            ,
            H.loadMotion = function(t) {
                t instanceof ArrayBuffer && (t = new DataView(t));
                var i = new H
                  , e = [0]
                  , r = t.byteLength;
                i._$yT = 0;
                for (var o = 0; o < r; ++o) {
                    var n = W(t, o)
                      , s = n.charCodeAt(0);
                    if ("\n" != n && "\r" != n)
                        if ("#" != n)
                            if ("$" != n) {
                                if (97 <= s && s <= 122 || 65 <= s && s <= 90 || "_" == n) {
                                    for (var _ = o, a = -1; o < r && "\r" != (n = W(t, o)) && "\n" != n; ++o)
                                        if ("=" == n) {
                                            a = o;
                                            break
                                        }
                                    if (a >= 0) {
                                        var h = new b;
                                        A.startsWith(t, _, H._$cs) ? (h._$RP = b._$hs,
                                        h._$4P = A.createString(t, _, a - _)) : A.startsWith(t, _, H._$ar) ? (h._$4P = A.createString(t, _ + 7, a - _ - 7),
                                        A.startsWith(t, _ + 7, "ANCHOR_X") ? h._$RP = b._$xs : A.startsWith(t, _ + 7, "ANCHOR_Y") ? h._$RP = b._$us : A.startsWith(t, _ + 7, "SCALE_X") ? h._$RP = b._$qs : A.startsWith(t, _ + 7, "SCALE_Y") ? h._$RP = b._$Ys : A.startsWith(t, _ + 7, "X") ? h._$RP = b._$ws : A.startsWith(t, _ + 7, "Y") && (h._$RP = b._$Ns)) : (h._$RP = b._$Fr,
                                        h._$4P = A.createString(t, _, a - _)),
                                        i.motions.push(h);
                                        var l = 0
                                          , $ = [];
                                        for (o = a + 1; o < r && "\r" != (n = W(t, o)) && "\n" != n; ++o)
                                            if ("," != n && " " != n && "\t" != n && (f = A._$LS(t, r, o, e),
                                            e[0] > 0)) {
                                                $.push(f),
                                                l++;
                                                var u = e[0];
                                                if (u < o) {
                                                    console.log("_$n0 _$hi . @Live2DMotion loadMotion()\n");
                                                    break
                                                }
                                                o = u - 1
                                            }
                                        h._$I0 = new Float32Array($),
                                        l > i._$yT && (i._$yT = l)
                                    }
                                }
                            } else {
                                for (var _ = o, a = -1; o < r && "\r" != (n = W(t, o)) && "\n" != n; ++o)
                                    if ("=" == n) {
                                        a = o;
                                        break
                                    }
                                var p = !1;
                                if (a >= 0)
                                    for (a == _ + 4 && "f" == W(t, _ + 1) && "p" == W(t, _ + 2) && "s" == W(t, _ + 3) && (p = !0),
                                    o = a + 1; o < r && "\r" != (n = W(t, o)) && "\n" != n; ++o)
                                        if ("," != n && " " != n && "\t" != n) {
                                            var f = A._$LS(t, r, o, e);
                                            e[0] > 0 && p && 5 < f && f < 121 && (i._$D0 = f),
                                            o = e[0]
                                        }
                                for (; o < r && "\n" != W(t, o) && "\r" != W(t, o); ++o)
                                    ;
                            }
                        else
                            for (; o < r && "\n" != W(t, o) && "\r" != W(t, o); ++o)
                                ;
                }
                return i._$rr = 1e3 * i._$yT / i._$D0 | 0,
                i
            }
            ,
            H.prototype.getDurationMSec = function() {
                return this._$E ? -1 : this._$rr
            }
            ,
            H.prototype.getLoopDurationMSec = function() {
                return this._$rr
            }
            ,
            H.prototype.dump = function() {
                for (var t = 0; t < this.motions.length; t++) {
                    var i = this.motions[t];
                    console.log("_$wL[%s] [%d]. ", i._$4P, i._$I0.length);
                    for (var e = 0; e < i._$I0.length && e < 10; e++)
                        console.log("%5.2f ,", i._$I0[e]);
                    console.log("\n")
                }
            }
            ,
            H.prototype.updateParamExe = function(t, i, e, r) {
                for (var o = (i - r._$z2) * this._$D0 / 1e3, n = 0 | o, s = o - n, _ = 0; _ < this.motions.length; _++) {
                    var a = this.motions[_]
                      , h = a._$I0.length
                      , l = a._$4P;
                    if (a._$RP == b._$hs) {
                        var $ = a._$I0[n >= h ? h - 1 : n];
                        t.setParamFloat(l, $)
                    } else if (b._$ws <= a._$RP && a._$RP <= b._$Ys)
                        ;
                    else {
                        var u, p = t.getParamIndex(l), f = t.getModelContext(), c = .4 * (f.getParamMax(p) - f.getParamMin(p)), d = f.getParamFloat(p), g = a._$I0[n >= h ? h - 1 : n], y = a._$I0[n + 1 >= h ? h - 1 : n + 1], m = d + ((u = g < y && y - g > c || g > y && g - y > c ? g : g + (y - g) * s) - d) * e;
                        t.setParamFloat(l, m)
                    }
                }
                n >= this._$yT && (this._$E ? (r._$z2 = i,
                this.loopFadeIn && (r._$bs = i)) : r._$9L = !0),
                this._$eP = e
            }
            ,
            H.prototype._$r0 = function() {
                return this._$E
            }
            ,
            H.prototype._$aL = function(t) {
                this._$E = t
            }
            ,
            H.prototype._$S0 = function() {
                return this._$D0
            }
            ,
            H.prototype._$U0 = function(t) {
                this._$D0 = t
            }
            ,
            H.prototype.isLoopFadeIn = function() {
                return this.loopFadeIn
            }
            ,
            H.prototype.setLoopFadeIn = function(t) {
                this.loopFadeIn = t
            }
            ,
            R.prototype.clear = function() {
                this.size = 0
            }
            ,
            R.prototype.add = function(t) {
                if (this._$P.length <= this.size) {
                    var i = new Float32Array(2 * this.size);
                    M._$jT(this._$P, 0, i, 0, this.size),
                    this._$P = i
                }
                this._$P[this.size++] = t
            }
            ,
            R.prototype._$BL = function() {
                var t = new Float32Array(this.size);
                return M._$jT(this._$P, 0, t, 0, this.size),
                t
            }
            ,
            b._$Fr = 0,
            b._$hs = 1,
            b._$ws = 100,
            b._$Ns = 101,
            b._$xs = 102,
            b._$us = 103,
            b._$qs = 104,
            b._$Ys = 105,
            j.prototype = new L,
            j._$gT = new Array,
            j.prototype._$zP = function() {
                this._$GS = new I,
                this._$GS._$zP()
            }
            ,
            j.prototype._$F0 = function(t) {
                L.prototype._$F0.call(this, t),
                this._$A = t._$6L(),
                this._$o = t._$6L(),
                this._$GS = t._$nP(),
                this._$Eo = t._$nP(),
                L.prototype.readV2_opacity.call(this, t)
            }
            ,
            j.prototype.init = function(t) {
                var i = new q(this)
                  , e = (this._$o + 1) * (this._$A + 1);
                return null != i._$Cr && (i._$Cr = null),
                i._$Cr = new Float32Array(2 * e),
                null != i._$hr && (i._$hr = null),
                this._$32() ? i._$hr = new Float32Array(2 * e) : i._$hr = null,
                i
            }
            ,
            j.prototype._$Nr = function(t, i) {
                var e = i;
                if (this._$GS._$Ur(t)) {
                    var r = this._$VT()
                      , o = j._$gT;
                    o[0] = !1,
                    y._$Vr(t, this._$GS, o, r, this._$Eo, e._$Cr, 0, 2),
                    i._$Ib(o[0]),
                    this.interpolateOpacity(t, this._$GS, i, o)
                }
            }
            ,
            j.prototype._$2b = function(t, i) {
                var e = i;
                if (e._$hS(!0),
                this._$32()) {
                    var r = this.getTargetBaseDataID();
                    if (e._$8r == L._$ur && (e._$8r = t.getBaseDataIndex(r)),
                    e._$8r < 0)
                        rt._$so && n._$li("_$L _$0P _$G :: %s", r),
                        e._$hS(!1);
                    else {
                        var o = t.getBaseData(e._$8r)
                          , s = t._$q2(e._$8r);
                        if (null != o && s._$yo()) {
                            var _ = s.getTotalScale();
                            e.setTotalScale_notForClient(_);
                            var a = s.getTotalOpacity();
                            e.setTotalOpacity(a * e.getInterpolatedOpacity()),
                            o._$nb(t, s, e._$Cr, e._$hr, this._$VT(), 0, 2),
                            e._$hS(!0)
                        } else
                            e._$hS(!1)
                    }
                } else
                    e.setTotalOpacity(e.getInterpolatedOpacity())
            }
            ,
            j.prototype._$nb = function(t, i, e, r, o, n, s) {
                var _ = i
                  , a = null != _._$hr ? _._$hr : _._$Cr;
                j.transformPoints_sdk2(e, r, o, n, s, a, this._$o, this._$A)
            }
            ,
            j.transformPoints_sdk2 = function(i, e, r, o, n, s, _, a) {
                for (var h, l, $, u = r * n, p = 0, f = 0, c = 0, d = 0, g = 0, y = 0, m = !1, T = o; T < u; T += n) {
                    var P, S, v, L;
                    if (v = i[T],
                    L = i[T + 1],
                    P = v * _,
                    S = L * a,
                    P < 0 || S < 0 || _ <= P || a <= S) {
                        var M = _ + 1;
                        if (!m) {
                            m = !0,
                            p = .25 * (s[2 * (0 + 0 * M)] + s[2 * (_ + 0 * M)] + s[2 * (0 + a * M)] + s[2 * (_ + a * M)]),
                            f = .25 * (s[2 * (0 + 0 * M) + 1] + s[2 * (_ + 0 * M) + 1] + s[2 * (0 + a * M) + 1] + s[2 * (_ + a * M) + 1]);
                            var E = s[2 * (_ + a * M)] - s[2 * (0 + 0 * M)]
                              , A = s[2 * (_ + a * M) + 1] - s[2 * (0 + 0 * M) + 1]
                              , I = s[2 * (_ + 0 * M)] - s[2 * (0 + a * M)]
                              , w = s[2 * (_ + 0 * M) + 1] - s[2 * (0 + a * M) + 1];
                            p -= .5 * ((c = .5 * (E + I)) + (g = .5 * (E - I))),
                            f -= .5 * ((d = .5 * (A + w)) + (y = .5 * (A - w)))
                        }
                        if (-2 < v && v < 3 && -2 < L && L < 3)
                            if (v <= 0)
                                if (L <= 0) {
                                    var x = s[2 * (0 + 0 * M)]
                                      , O = s[2 * (0 + 0 * M) + 1]
                                      , D = p - 2 * c
                                      , R = f - 2 * d
                                      , b = p - 2 * g
                                      , F = f - 2 * y
                                      , C = p - 2 * c - 2 * g
                                      , N = f - 2 * d - 2 * y;
                                    (B = .5 * (v - -2)) + (G = .5 * (L - -2)) <= 1 ? (e[T] = C + (b - C) * B + (D - C) * G,
                                    e[T + 1] = N + (F - N) * B + (R - N) * G) : (e[T] = x + (D - x) * (1 - B) + (b - x) * (1 - G),
                                    e[T + 1] = O + (R - O) * (1 - B) + (F - O) * (1 - G))
                                } else if (L >= 1) {
                                    var b = s[2 * (0 + a * M)]
                                      , F = s[2 * (0 + a * M) + 1]
                                      , C = p - 2 * c + 1 * g
                                      , N = f - 2 * d + 1 * y
                                      , x = p + 3 * g
                                      , O = f + 3 * y
                                      , D = p - 2 * c + 3 * g
                                      , R = f - 2 * d + 3 * y;
                                    (B = .5 * (v - -2)) + (G = .5 * (L - 1)) <= 1 ? (e[T] = C + (b - C) * B + (D - C) * G,
                                    e[T + 1] = N + (F - N) * B + (R - N) * G) : (e[T] = x + (D - x) * (1 - B) + (b - x) * (1 - G),
                                    e[T + 1] = O + (R - O) * (1 - B) + (F - O) * (1 - G))
                                } else {
                                    (k = 0 | S) == a && (k = a - 1);
                                    var B = .5 * (v - -2)
                                      , G = S - k
                                      , U = k / a
                                      , Y = (k + 1) / a
                                      , b = s[2 * (0 + k * M)]
                                      , F = s[2 * (0 + k * M) + 1]
                                      , x = s[2 * (0 + (k + 1) * M)]
                                      , O = s[2 * (0 + (k + 1) * M) + 1]
                                      , C = p - 2 * c + U * g
                                      , N = f - 2 * d + U * y
                                      , D = p - 2 * c + Y * g
                                      , R = f - 2 * d + Y * y;
                                    B + G <= 1 ? (e[T] = C + (b - C) * B + (D - C) * G,
                                    e[T + 1] = N + (F - N) * B + (R - N) * G) : (e[T] = x + (D - x) * (1 - B) + (b - x) * (1 - G),
                                    e[T + 1] = O + (R - O) * (1 - B) + (F - O) * (1 - G))
                                }
                            else if (1 <= v)
                                if (L <= 0) {
                                    var D = s[2 * (_ + 0 * M)]
                                      , R = s[2 * (_ + 0 * M) + 1]
                                      , x = p + 3 * c
                                      , O = f + 3 * d
                                      , C = p + 1 * c - 2 * g
                                      , N = f + 1 * d - 2 * y
                                      , b = p + 3 * c - 2 * g
                                      , F = f + 3 * d - 2 * y;
                                    (B = .5 * (v - 1)) + (G = .5 * (L - -2)) <= 1 ? (e[T] = C + (b - C) * B + (D - C) * G,
                                    e[T + 1] = N + (F - N) * B + (R - N) * G) : (e[T] = x + (D - x) * (1 - B) + (b - x) * (1 - G),
                                    e[T + 1] = O + (R - O) * (1 - B) + (F - O) * (1 - G))
                                } else if (L >= 1) {
                                    var C = s[2 * (_ + a * M)]
                                      , N = s[2 * (_ + a * M) + 1]
                                      , b = p + 3 * c + 1 * g
                                      , F = f + 3 * d + 1 * y
                                      , D = p + 1 * c + 3 * g
                                      , R = f + 1 * d + 3 * y
                                      , x = p + 3 * c + 3 * g
                                      , O = f + 3 * d + 3 * y;
                                    (B = .5 * (v - 1)) + (G = .5 * (L - 1)) <= 1 ? (e[T] = C + (b - C) * B + (D - C) * G,
                                    e[T + 1] = N + (F - N) * B + (R - N) * G) : (e[T] = x + (D - x) * (1 - B) + (b - x) * (1 - G),
                                    e[T + 1] = O + (R - O) * (1 - B) + (F - O) * (1 - G))
                                } else {
                                    var k = 0 | S;
                                    k == a && (k = a - 1);
                                    var B = .5 * (v - 1)
                                      , G = S - k
                                      , U = k / a
                                      , Y = (k + 1) / a
                                      , C = s[2 * (_ + k * M)]
                                      , N = s[2 * (_ + k * M) + 1]
                                      , D = s[2 * (_ + (k + 1) * M)]
                                      , R = s[2 * (_ + (k + 1) * M) + 1]
                                      , b = p + 3 * c + U * g
                                      , F = f + 3 * d + U * y
                                      , x = p + 3 * c + Y * g
                                      , O = f + 3 * d + Y * y;
                                    B + G <= 1 ? (e[T] = C + (b - C) * B + (D - C) * G,
                                    e[T + 1] = N + (F - N) * B + (R - N) * G) : (e[T] = x + (D - x) * (1 - B) + (b - x) * (1 - G),
                                    e[T + 1] = O + (R - O) * (1 - B) + (F - O) * (1 - G))
                                }
                            else if (L <= 0) {
                                (z = 0 | P) == _ && (z = _ - 1);
                                var B = P - z
                                  , G = .5 * (L - -2)
                                  , V = z / _
                                  , X = (z + 1) / _
                                  , D = s[2 * (z + 0 * M)]
                                  , R = s[2 * (z + 0 * M) + 1]
                                  , x = s[2 * (z + 1 + 0 * M)]
                                  , O = s[2 * (z + 1 + 0 * M) + 1]
                                  , C = p + V * c - 2 * g
                                  , N = f + V * d - 2 * y
                                  , b = p + X * c - 2 * g
                                  , F = f + X * d - 2 * y;
                                B + G <= 1 ? (e[T] = C + (b - C) * B + (D - C) * G,
                                e[T + 1] = N + (F - N) * B + (R - N) * G) : (e[T] = x + (D - x) * (1 - B) + (b - x) * (1 - G),
                                e[T + 1] = O + (R - O) * (1 - B) + (F - O) * (1 - G))
                            } else if (L >= 1) {
                                var z = 0 | P;
                                z == _ && (z = _ - 1);
                                var B = P - z
                                  , G = .5 * (L - 1)
                                  , V = z / _
                                  , X = (z + 1) / _
                                  , C = s[2 * (z + a * M)]
                                  , N = s[2 * (z + a * M) + 1]
                                  , b = s[2 * (z + 1 + a * M)]
                                  , F = s[2 * (z + 1 + a * M) + 1]
                                  , D = p + V * c + 3 * g
                                  , R = f + V * d + 3 * y
                                  , x = p + X * c + 3 * g
                                  , O = f + X * d + 3 * y;
                                B + G <= 1 ? (e[T] = C + (b - C) * B + (D - C) * G,
                                e[T + 1] = N + (F - N) * B + (R - N) * G) : (e[T] = x + (D - x) * (1 - B) + (b - x) * (1 - G),
                                e[T + 1] = O + (R - O) * (1 - B) + (F - O) * (1 - G))
                            } else
                                t.err.printf("_$li calc : %.4f , %.4f\t\t\t\t\t@@BDBoxGrid\n", v, L);
                        else
                            e[T] = p + v * c + L * g,
                            e[T + 1] = f + v * d + L * y
                    } else
                        l = P - (0 | P),
                        $ = S - (0 | S),
                        h = 2 * ((0 | P) + (0 | S) * (_ + 1)),
                        l + $ < 1 ? (e[T] = s[h] * (1 - l - $) + s[h + 2] * l + s[h + 2 * (_ + 1)] * $,
                        e[T + 1] = s[h + 1] * (1 - l - $) + s[h + 3] * l + s[h + 2 * (_ + 1) + 1] * $) : (e[T] = s[h + 2 * (_ + 1) + 2] * (l - 1 + $) + s[h + 2 * (_ + 1)] * (1 - l) + s[h + 2] * (1 - $),
                        e[T + 1] = s[h + 2 * (_ + 1) + 3] * (l - 1 + $) + s[h + 2 * (_ + 1) + 1] * (1 - l) + s[h + 3] * (1 - $))
                }
            }
            ,
            j.prototype.transformPoints_sdk1 = function(t, i, e, r, o, n, s) {
                for (var _, a, h, l, $, u, p, f = i, c = this._$o, d = this._$A, g = o * s, y = null != f._$hr ? f._$hr : f._$Cr, m = n; m < g; m += s)
                    rt._$ts ? (_ = e[m],
                    a = e[m + 1],
                    _ < 0 ? _ = 0 : _ > 1 && (_ = 1),
                    a < 0 ? a = 0 : a > 1 && (a = 1),
                    _ *= c,
                    a *= d,
                    h = 0 | _,
                    l = 0 | a,
                    h > c - 1 && (h = c - 1),
                    l > d - 1 && (l = d - 1),
                    u = _ - h,
                    p = a - l,
                    $ = 2 * (h + l * (c + 1))) : (_ = e[m] * c,
                    a = e[m + 1] * d,
                    u = _ - (0 | _),
                    p = a - (0 | a),
                    $ = 2 * ((0 | _) + (0 | a) * (c + 1))),
                    u + p < 1 ? (r[m] = y[$] * (1 - u - p) + y[$ + 2] * u + y[$ + 2 * (c + 1)] * p,
                    r[m + 1] = y[$ + 1] * (1 - u - p) + y[$ + 3] * u + y[$ + 2 * (c + 1) + 1] * p) : (r[m] = y[$ + 2 * (c + 1) + 2] * (u - 1 + p) + y[$ + 2 * (c + 1)] * (1 - u) + y[$ + 2] * (1 - p),
                    r[m + 1] = y[$ + 2 * (c + 1) + 3] * (u - 1 + p) + y[$ + 2 * (c + 1) + 1] * (1 - u) + y[$ + 3] * (1 - p))
            }
            ,
            j.prototype._$VT = function() {
                return (this._$o + 1) * (this._$A + 1)
            }
            ,
            j.prototype.getType = function() {
                return L._$_b
            }
            ,
            q.prototype = new et,
            J._$42 = 0,
            J.prototype._$zP = function() {
                this._$3S = new Array,
                this._$aS = new Array
            }
            ,
            J.prototype._$F0 = function(t) {
                this._$g0 = t._$8L(),
                this.visible = t._$8L(),
                this._$NL = t._$nP(),
                this._$3S = t._$nP(),
                this._$aS = t._$nP()
            }
            ,
            J.prototype.init = function(t) {
                var i = new Q(this);
                return i.setPartsOpacity(this.isVisible() ? 1 : 0),
                i
            }
            ,
            J.prototype._$6o = function(t) {
                if (null == this._$3S)
                    throw new Error("_$3S _$6 _$Wo@_$6o");
                this._$3S.push(t)
            }
            ,
            J.prototype._$3o = function(t) {
                if (null == this._$aS)
                    throw new Error("_$aS _$6 _$Wo@_$3o");
                this._$aS.push(t)
            }
            ,
            J.prototype._$Zo = function(t) {
                this._$3S = t
            }
            ,
            J.prototype._$xo = function(t) {
                this._$aS = t
            }
            ,
            J.prototype.isVisible = function() {
                return this.visible
            }
            ,
            J.prototype._$uL = function() {
                return this._$g0
            }
            ,
            J.prototype._$KP = function(t) {
                this.visible = t
            }
            ,
            J.prototype._$ET = function(t) {
                this._$g0 = t
            }
            ,
            J.prototype.getBaseData = function() {
                return this._$3S
            }
            ,
            J.prototype.getDrawData = function() {
                return this._$aS
            }
            ,
            J.prototype._$p2 = function() {
                return this._$NL
            }
            ,
            J.prototype._$ob = function(t) {
                this._$NL = t
            }
            ,
            J.prototype.getPartsID = function() {
                return this._$NL
            }
            ,
            J.prototype._$MP = function(t) {
                this._$NL = t
            }
            ,
            (Q.prototype = new function() {}
            ).getPartsOpacity = function() {
                return this._$VS
            }
            ,
            Q.prototype.setPartsOpacity = function(t) {
                this._$VS = t
            }
            ,
            Z._$L7 = function() {
                a._$27(),
                pt._$27(),
                x._$27(),
                _._$27()
            }
            ,
            Z.prototype.toString = function() {
                return this.id
            }
            ,
            function() {}
            .prototype._$F0 = function(t) {}
            ,
            K.prototype._$1s = function() {
                return this._$4S
            }
            ,
            K.prototype._$zP = function() {
                this._$4S = new Array
            }
            ,
            K.prototype._$F0 = function(t) {
                this._$4S = t._$nP()
            }
            ,
            K.prototype._$Ks = function(t) {
                this._$4S.push(t)
            }
            ,
            tt.tr = new ut,
            tt._$50 = new ut,
            tt._$Ti = new Array(0,0),
            tt._$Pi = new Array(0,0),
            tt._$B = new Array(0,0),
            tt.prototype._$lP = function(t, i, e, r) {
                this.viewport = new Array(t,i,e,r)
            }
            ,
            tt.prototype._$bL = function() {
                this.context.save();
                var t = this.viewport;
                null != t && (this.context.beginPath(),
                this.context._$Li(t[0], t[1], t[2], t[3]),
                this.context.clip())
            }
            ,
            tt.prototype._$ei = function() {
                this.context.restore()
            }
            ,
            tt.prototype.drawElements = function(t, i, e, r, o, s, _, a) {
                try {
                    o != this._$Qo && (this._$Qo = o,
                    this.context.globalAlpha = o);
                    for (var h = i.length, l = t.width, $ = t.height, u = this.context, p = this._$xP, f = this._$uP, c = this._$6r, d = this._$3r, g = tt.tr, y = tt._$Ti, m = tt._$Pi, T = tt._$B, P = 0; P < h; P += 3) {
                        u.save();
                        var S = i[P]
                          , v = i[P + 1]
                          , L = i[P + 2]
                          , M = p + c * e[2 * S]
                          , E = f + d * e[2 * S + 1]
                          , A = p + c * e[2 * v]
                          , I = f + d * e[2 * v + 1]
                          , w = p + c * e[2 * L]
                          , x = f + d * e[2 * L + 1];
                        _ && (_._$PS(M, E, T),
                        M = T[0],
                        E = T[1],
                        _._$PS(A, I, T),
                        A = T[0],
                        I = T[1],
                        _._$PS(w, x, T),
                        w = T[0],
                        x = T[1]);
                        var O = l * r[2 * S]
                          , D = $ - $ * r[2 * S + 1]
                          , R = l * r[2 * v]
                          , b = $ - $ * r[2 * v + 1]
                          , F = l * r[2 * L]
                          , C = $ - $ * r[2 * L + 1]
                          , N = Math.atan2(b - D, R - O)
                          , B = Math.atan2(I - E, A - M)
                          , G = A - M
                          , U = I - E
                          , Y = Math.sqrt(G * G + U * U)
                          , k = R - O
                          , V = b - D
                          , X = Y / Math.sqrt(k * k + V * V);
                        Pt._$ni(F, C, O, D, R - O, b - D, -(b - D), R - O, y),
                        Pt._$ni(w, x, M, E, A - M, I - E, -(I - E), A - M, m);
                        var z = (m[0] - y[0]) / y[1]
                          , H = Math.min(O, R, F)
                          , W = Math.max(O, R, F)
                          , j = Math.min(D, b, C)
                          , q = Math.max(D, b, C)
                          , J = Math.floor(H)
                          , Q = Math.floor(j)
                          , Z = Math.ceil(W)
                          , K = Math.ceil(q);
                        if (g.identity(),
                        g.translate(M, E),
                        g.rotate(B),
                        g.scale(1, m[1] / y[1]),
                        g.shear(z, 0),
                        g.scale(X, X),
                        g.rotate(-N),
                        g.translate(-O, -D),
                        g.setContext(u),
                        s || (s = 1.2),
                        rt.IGNORE_EXPAND && (s = 0),
                        rt.USE_CACHED_POLYGON_IMAGE) {
                            var it = a._$e0;
                            if (it.gl_cacheImage = it.gl_cacheImage || {},
                            !it.gl_cacheImage[P]) {
                                var et = tt.createCanvas(Z - J, K - Q);
                                rt.DEBUG_DATA.LDGL_CANVAS_MB = rt.DEBUG_DATA.LDGL_CANVAS_MB || 0,
                                rt.DEBUG_DATA.LDGL_CANVAS_MB += (Z - J) * (K - Q) * 4;
                                var ot = et.getContext("2d");
                                ot.translate(-J, -Q),
                                tt.clip(ot, g, s, Y, O, D, R, b, F, C, M, E, A, I, w, x),
                                ot.drawImage(t, 0, 0),
                                it.gl_cacheImage[P] = {
                                    cacheCanvas: et,
                                    cacheContext: ot
                                }
                            }
                            u.drawImage(it.gl_cacheImage[P].cacheCanvas, J, Q)
                        } else
                            rt.IGNORE_CLIP || tt.clip(u, g, s, Y, O, D, R, b, F, C, M, E, A, I, w, x),
                            rt.USE_ADJUST_TRANSLATION && (H = 0,
                            W = l,
                            j = 0,
                            q = $),
                            u.drawImage(t, H, j, W - H, q - j, H, j, W - H, q - j);
                        u.restore()
                    }
                } catch (t) {
                    n._$Rb(t)
                }
            }
            ,
            tt.clip = function(t, i, e, r, o, n, s, _, a, h, l, $, u, p, f, c) {
                e > .02 ? tt.expandClip(t, i, e, r, l, $, u, p, f, c) : tt.clipWithTransform(t, null, o, n, s, _, a, h)
            }
            ,
            tt.expandClip = function(t, i, e, r, o, n, s, _, a, h) {
                var l = s - o
                  , $ = _ - n
                  , u = a - o
                  , p = h - n
                  , f = l * p - $ * u > 0 ? e : -e
                  , c = -$
                  , d = l
                  , g = a - s
                  , y = h - _
                  , m = -y
                  , T = g
                  , P = Math.sqrt(g * g + y * y)
                  , S = -p
                  , v = u
                  , L = Math.sqrt(u * u + p * p)
                  , M = o - f * c / r
                  , E = n - f * d / r
                  , A = s - f * c / r
                  , I = _ - f * d / r
                  , w = s - f * m / P
                  , x = _ - f * T / P
                  , O = a - f * m / P
                  , D = h - f * T / P
                  , R = o + f * S / L
                  , b = n + f * v / L
                  , F = a + f * S / L
                  , C = h + f * v / L
                  , N = tt._$50;
                return null != i._$P2(N) && (tt.clipWithTransform(t, N, M, E, A, I, w, x, O, D, F, C, R, b),
                !0)
            }
            ,
            tt.clipWithTransform = function(t, i, e, r, o, s, _, a) {
                if (arguments.length < 7)
                    n._$li("err : @LDGL.clip()");
                else if (arguments[1]instanceof ut) {
                    var h = tt._$B
                      , l = i
                      , $ = arguments;
                    if (t.beginPath(),
                    l)
                        for (l._$PS($[2], $[3], h),
                        t.moveTo(h[0], h[1]),
                        u = 4; u < $.length; u += 2)
                            l._$PS($[u], $[u + 1], h),
                            t.lineTo(h[0], h[1]);
                    else {
                        t.moveTo($[2], $[3]);
                        for (var u = 4; u < $.length; u += 2)
                            t.lineTo($[u], $[u + 1])
                    }
                    t.clip()
                } else
                    n._$li("err : a[0] is _$6 LDTransform @LDGL.clip()")
            }
            ,
            tt.createCanvas = function(t, i) {
                var e = document.createElement("canvas");
                return e.setAttribute("width", t),
                e.setAttribute("height", i),
                e || n._$li("err : " + e),
                e
            }
            ,
            tt.dumpValues = function() {
                for (var t = "", i = 0; i < arguments.length; i++)
                    t += "[" + i + "]= " + arguments[i].toFixed(3) + " , ";
                console.log(t)
            }
            ,
            it.prototype._$F0 = function(t) {
                this._$TT = t._$_T(),
                this._$LT = t._$_T(),
                this._$FS = t._$_T(),
                this._$wL = t._$nP()
            }
            ,
            it.prototype.getMinValue = function() {
                return this._$TT
            }
            ,
            it.prototype.getMaxValue = function() {
                return this._$LT
            }
            ,
            it.prototype.getDefaultValue = function() {
                return this._$FS
            }
            ,
            it.prototype.getParamID = function() {
                return this._$wL
            }
            ,
            et.prototype._$yo = function() {
                return this._$AT && !this._$JS
            }
            ,
            et.prototype._$hS = function(t) {
                this._$AT = t
            }
            ,
            et.prototype._$GT = function() {
                return this._$e0
            }
            ,
            et.prototype._$l2 = function(t) {
                this._$IP = t
            }
            ,
            et.prototype.getPartsIndex = function() {
                return this._$IP
            }
            ,
            et.prototype._$x2 = function() {
                return this._$JS
            }
            ,
            et.prototype._$Ib = function(t) {
                this._$JS = t
            }
            ,
            et.prototype.getTotalScale = function() {
                return this.totalScale
            }
            ,
            et.prototype.setTotalScale_notForClient = function(t) {
                this.totalScale = t
            }
            ,
            et.prototype.getInterpolatedOpacity = function() {
                return this._$7s
            }
            ,
            et.prototype.setInterpolatedOpacity = function(t) {
                this._$7s = t
            }
            ,
            et.prototype.getTotalOpacity = function(t) {
                return this.totalOpacity
            }
            ,
            et.prototype.setTotalOpacity = function(t) {
                this.totalOpacity = t
            }
            ,
            rt._$2s = "2.1.00_1",
            rt._$Kr = 201001e3,
            rt._$sP = !0,
            rt._$so = !0,
            rt._$cb = !1,
            rt._$3T = !0,
            rt._$Ts = !0,
            rt._$fb = !0,
            rt._$ts = !0,
            rt.L2D_DEFORMER_EXTEND = !0,
            rt._$Wb = !1,
            rt._$yr = !1,
            rt._$Zs = !1,
            rt.L2D_NO_ERROR = 0,
            rt._$i7 = 1e3,
            rt._$9s = 1001,
            rt._$es = 1100,
            rt._$r7 = 2e3,
            rt._$07 = 2001,
            rt._$b7 = 2002,
            rt._$H7 = 4e3,
            rt.L2D_COLOR_BLEND_MODE_MULT = 0,
            rt.L2D_COLOR_BLEND_MODE_ADD = 1,
            rt.L2D_COLOR_BLEND_MODE_INTERPOLATE = 2,
            rt._$6b = !0,
            rt._$cT = 0,
            rt.clippingMaskBufferSize = 256,
            rt.glContext = new Array,
            rt.frameBuffers = new Array,
            rt.fTexture = new Array,
            rt.IGNORE_CLIP = !1,
            rt.IGNORE_EXPAND = !1,
            rt.EXPAND_W = 2,
            rt.USE_ADJUST_TRANSLATION = !0,
            rt.USE_CANVAS_TRANSFORM = !0,
            rt.USE_CACHED_POLYGON_IMAGE = !1,
            rt.DEBUG_DATA = {},
            rt.PROFILE_IOS_SPEED = {
                PROFILE_NAME: "iOS Speed",
                USE_ADJUST_TRANSLATION: !0,
                USE_CACHED_POLYGON_IMAGE: !0,
                EXPAND_W: 4
            },
            rt.PROFILE_IOS_DEFAULT = rt.PROFILE_IOS_QUALITY = {
                PROFILE_NAME: "iOS HiQ",
                USE_ADJUST_TRANSLATION: !0,
                USE_CACHED_POLYGON_IMAGE: !1,
                EXPAND_W: 2
            },
            rt.PROFILE_ANDROID = {
                PROFILE_NAME: "Android",
                USE_ADJUST_TRANSLATION: !1,
                USE_CACHED_POLYGON_IMAGE: !1,
                EXPAND_W: 2
            },
            rt.PROFILE_DESKTOP = {
                PROFILE_NAME: "Desktop",
                USE_ADJUST_TRANSLATION: !1,
                USE_CACHED_POLYGON_IMAGE: !1,
                EXPAND_W: 2
            },
            rt.initProfile = function() {
                rt.setupProfile(Tt.isIOS() ? rt.PROFILE_IOS_DEFAULT : Tt.isAndroid() ? rt.PROFILE_ANDROID : rt.PROFILE_DESKTOP)
            }
            ,
            rt.setupProfile = function(t, i) {
                if ("number" == typeof t)
                    switch (t) {
                    case 9901:
                        t = rt.PROFILE_IOS_SPEED;
                        break;
                    case 9902:
                        t = rt.PROFILE_IOS_QUALITY;
                        break;
                    case 9903:
                        t = rt.PROFILE_IOS_DEFAULT;
                        break;
                    case 9904:
                        t = rt.PROFILE_ANDROID;
                        break;
                    case 9905:
                        t = rt.PROFILE_DESKTOP;
                        break;
                    default:
                        alert("profile _$6 _$Ui : " + t)
                    }
                arguments.length < 2 && (i = !0),
                i;
                for (var e in t)
                    rt[e] = t[e],
                    i
            }
            ,
            rt.init = function() {
                rt._$6b && (
                rt._$6b = !1,
                rt.initProfile())
            }
            ,
            rt.getVersionStr = function() {
                return rt._$2s
            }
            ,
            rt.getVersionNo = function() {
                return rt._$Kr
            }
            ,
            rt._$sT = function(t) {
                rt._$cT = t
            }
            ,
            rt.getError = function() {
                var t = rt._$cT;
                return rt._$cT = 0,
                t
            }
            ,
            rt.dispose = function() {
                rt.glContext = [],
                rt.frameBuffers = [],
                rt.fTexture = []
            }
            ,
            rt.setGL = function(t, i) {
                rt.glContext[i || 0] = t
            }
            ,
            rt.getGL = function(t) {
                return rt.glContext[t]
            }
            ,
            rt.setClippingMaskBufferSize = function(t) {
                rt.clippingMaskBufferSize = t
            }
            ,
            rt.getClippingMaskBufferSize = function() {
                return rt.clippingMaskBufferSize
            }
            ,
            rt.deleteBuffer = function(t) {
                rt.getGL(t).deleteFramebuffer(rt.frameBuffers[t].framebuffer),
                delete rt.frameBuffers[t],
                delete rt.glContext[t]
            }
            ,
            ot._$r2 = function(t) {
                return t < 0 ? 0 : t > 1 ? 1 : .5 - .5 * Math.cos(t * yt.PI_F)
            }
            ,
            nt._$fr = -1,
            nt.prototype.toString = function() {
                return this._$ib
            }
            ,
            st.prototype = new V,
            st._$42 = 0,
            st._$Os = 30,
            st._$ms = 0,
            st._$ns = 1,
            st._$_s = 2,
            st._$gT = new Array,
            st.prototype._$_S = function(t) {
                this._$LP = t
            }
            ,
            st.prototype.getTextureNo = function() {
                return this._$LP
            }
            ,
            st.prototype._$ZL = function() {
                return this._$Qi
            }
            ,
            st.prototype._$H2 = function() {
                return this._$JP
            }
            ,
            st.prototype.getNumPoints = function() {
                return this._$d0
            }
            ,
            st.prototype.getType = function() {
                return V._$wb
            }
            ,
            st.prototype._$B2 = function(t, i, e) {
                var r = i
                  , o = null != r._$hr ? r._$hr : r._$Cr;
                switch (F._$do) {
                default:
                case F._$Ms:
                    throw new Error("_$L _$ro ");
                case F._$Qs:
                    for (var n = this._$d0 - 1; n >= 0; --n)
                        o[n * F._$No + 4] = e
                }
            }
            ,
            st.prototype._$zP = function() {
                this._$GS = new I,
                this._$GS._$zP()
            }
            ,
            st.prototype._$F0 = function(t) {
                V.prototype._$F0.call(this, t),
                this._$LP = t._$6L(),
                this._$d0 = t._$6L(),
                this._$Yo = t._$6L();
                var i = t._$nP();
                this._$BP = new Int16Array(3 * this._$Yo);
                for (var e = 3 * this._$Yo - 1; e >= 0; --e)
                    this._$BP[e] = i[e];
                if (this._$Eo = t._$nP(),
                this._$Qi = t._$nP(),
                t.getFormatVersion() >= C._$s7) {
                    if (this._$JP = t._$6L(),
                    0 != this._$JP) {
                        if (0 != (1 & this._$JP)) {
                            var r = t._$6L();
                            null == this._$5P && (this._$5P = new Object),
                            this._$5P._$Hb = parseInt(r)
                        }
                        0 != (this._$JP & st._$Os) ? this._$6s = (this._$JP & st._$Os) >> 1 : this._$6s = st._$ms,
                        0 != (32 & this._$JP) && (this.culling = !1)
                    }
                } else
                    this._$JP = 0
            }
            ,
            st.prototype.init = function(t) {
                var i = new _t(this)
                  , e = this._$d0 * F._$No
                  , r = this._$32();
                switch (null != i._$Cr && (i._$Cr = null),
                i._$Cr = new Float32Array(e),
                null != i._$hr && (i._$hr = null),
                i._$hr = r ? new Float32Array(e) : null,
                F._$do) {
                default:
                case F._$Ms:
                    if (F._$Ls)
                        for (o = this._$d0 - 1; o >= 0; --o)
                            n = o << 1,
                            this._$Qi[n + 1] = 1 - this._$Qi[n + 1];
                    break;
                case F._$Qs:
                    for (var o = this._$d0 - 1; o >= 0; --o) {
                        var n = o << 1
                          , s = o * F._$No
                          , _ = this._$Qi[n]
                          , a = this._$Qi[n + 1];
                        i._$Cr[s] = _,
                        i._$Cr[s + 1] = a,
                        i._$Cr[s + 4] = 0,
                        r && (i._$hr[s] = _,
                        i._$hr[s + 1] = a,
                        i._$hr[s + 4] = 0)
                    }
                }
                return i
            }
            ,
            st.prototype._$Nr = function(t, i) {
                var e = i;
                if (this != e._$GT() && console.log("### assert!! ### "),
                this._$GS._$Ur(t) && (V.prototype._$Nr.call(this, t, e),
                !e._$IS[0])) {
                    var r = st._$gT;
                    r[0] = !1,
                    y._$Vr(t, this._$GS, r, this._$d0, this._$Eo, e._$Cr, F._$i2, F._$No)
                }
            }
            ,
            st.prototype._$2b = function(t, i) {
                try {
                    this != i._$GT() && console.log("### assert!! ### ");
                    var e = !1;
                    i._$IS[0] && (e = !0);
                    var r = i;
                    if (!e && (V.prototype._$2b.call(this, t),
                    this._$32())) {
                        var o = this.getTargetBaseDataID();
                        if (r._$8r == V._$ur && (r._$8r = t.getBaseDataIndex(o)),
                        r._$8r < 0)
                            rt._$so && n._$li("_$L _$0P _$G :: %s", o);
                        else {
                            var s = t.getBaseData(r._$8r)
                              , _ = t._$q2(r._$8r);
                            null == s || _._$x2() ? r._$AT = !1 : (s._$nb(t, _, r._$Cr, r._$hr, this._$d0, F._$i2, F._$No),
                            r._$AT = !0),
                            r.baseOpacity = _.getTotalOpacity()
                        }
                    }
                } catch (t) {
                    throw t
                }
            }
            ,
            st.prototype.draw = function(t, i, e) {
                if (this != e._$GT() && console.log("### assert!! ### "),
                !e._$IS[0]) {
                    var r = e
                      , o = this._$LP;
                    o < 0 && (o = 1);
                    var n = this.getOpacity(i, r) * e._$VS * e.baseOpacity
                      , s = null != r._$hr ? r._$hr : r._$Cr;
                    t.setClipBufPre_clipContextForDraw(e.clipBufPre_clipContext),
                    t._$WP(this.culling),
                    t._$Uo(o, 3 * this._$Yo, this._$BP, s, this._$Qi, n, this._$6s, r)
                }
            }
            ,
            st.prototype.dump = function() {
                for (console.log("  _$yi( %d ) , _$d0( %d ) , _$Yo( %d ) \n", this._$LP, this._$d0, this._$Yo),
                console.log("  _$Oi _$di = { "),
                t = 0; t < this._$BP.length; t++)
                    console.log("%5d ,", this._$BP[t]);
                console.log("\n  _$5i _$30");
                for (var t = 0; t < this._$Eo.length; t++) {
                    console.log("\n    _$30[%d] = ", t);
                    for (var i = this._$Eo[t], e = 0; e < i.length; e++)
                        console.log("%6.2f, ", i[e])
                }
                console.log("\n")
            }
            ,
            st.prototype._$72 = function(t) {
                return null == this._$5P ? null : this._$5P[t]
            }
            ,
            st.prototype.getIndexArray = function() {
                return this._$BP
            }
            ,
            (_t.prototype = new mt).getTransformedPoints = function() {
                return null != this._$hr ? this._$hr : this._$Cr
            }
            ,
            at.prototype._$HT = function(t) {
                this.x = t.x,
                this.y = t.y
            }
            ,
            at.prototype._$HT = function(t, i) {
                this.x = t,
                this.y = i
            }
            ,
            ht.prototype = new i,
            ht.loadModel = function(t) {
                var e = new ht;
                return i._$62(e, t),
                e
            }
            ,
            ht.loadModel = function(t, e) {
                var r = new ht(e || 0);
                return i._$62(r, t),
                r
            }
            ,
            ht._$to = function() {
                return new ht
            }
            ,
            ht._$er = function(t) {
                var i = new _$5("../_$_r/_$t0/_$Ri/_$_P._$d");
                if (0 == i.exists())
                    throw new _$ls("_$t0 _$_ _$6 _$Ui :: " + i._$PL());
                for (var e = ["../_$_r/_$t0/_$Ri/_$_P.512/_$CP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$vP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$EP._$1", "../_$_r/_$t0/_$Ri/_$_P.512/_$pP._$1"], r = ht.loadModel(i._$3b()), o = 0; o < e.length; o++) {
                    var n = new _$5(e[o]);
                    if (0 == n.exists())
                        throw new _$ls("_$t0 _$_ _$6 _$Ui :: " + n._$PL());
                    r.setTexture(o, _$nL._$_o(t, n._$3b()))
                }
                return r
            }
            ,
            ht.prototype.setGL = function(t) {
                rt.setGL(t)
            }
            ,
            ht.prototype.setTransform = function(t) {
                this.drawParamWebGL.setTransform(t)
            }
            ,
            ht.prototype.update = function() {
                this._$5S.update(),
                this._$5S.preDraw(this.drawParamWebGL)
            }
            ,
            ht.prototype.draw = function() {
                this._$5S.draw(this.drawParamWebGL)
            }
            ,
            ht.prototype._$K2 = function() {
                this.drawParamWebGL._$K2()
            }
            ,
            ht.prototype.setTexture = function(t, i) {
                null == this.drawParamWebGL && n._$li("_$Yi for QT _$ki / _$XS() is _$6 _$ui!!"),
                this.drawParamWebGL.setTexture(t, i)
            }
            ,
            ht.prototype.setTexture = function(t, i) {
                null == this.drawParamWebGL && n._$li("_$Yi for QT _$ki / _$XS() is _$6 _$ui!!"),
                this.drawParamWebGL.setTexture(t, i)
            }
            ,
            ht.prototype._$Rs = function() {
                return this.drawParamWebGL._$Rs()
            }
            ,
            ht.prototype._$Ds = function(t) {
                this.drawParamWebGL._$Ds(t)
            }
            ,
            ht.prototype.getDrawParam = function() {
                return this.drawParamWebGL
            }
            ,
            ht.prototype.setMatrix = function(t) {
                this.drawParamWebGL.setMatrix(t)
            }
            ,
            ht.prototype.setPremultipliedAlpha = function(t) {
                this.drawParamWebGL.setPremultipliedAlpha(t)
            }
            ,
            ht.prototype.isPremultipliedAlpha = function() {
                return this.drawParamWebGL.isPremultipliedAlpha()
            }
            ,
            ht.prototype.setAnisotropy = function(t) {
                this.drawParamWebGL.setAnisotropy(t)
            }
            ,
            ht.prototype.getAnisotropy = function() {
                return this.drawParamWebGL.getAnisotropy()
            }
            ,
            lt.prototype._$tb = function() {
                return this.motions
            }
            ,
            lt.prototype.startMotion = function(t, i) {
                for (var e = null, r = this.motions.length, o = 0; o < r; ++o)
                    null != (e = this.motions[o]) && (e._$qS(e._$w0.getFadeOut()),
                    this._$eb && n._$Ji("MotionQueueManager[size:%2d]->startMotion() / start _$K _$3 (m%d)\n", r, e._$sr));
                if (null == t)
                    return -1;
                (e = new $t)._$w0 = t,
                this.motions.push(e);
                var s = e._$sr;
                return this._$eb && n._$Ji("MotionQueueManager[size:%2d]->startMotion() / new _$w0 (m%d)\n", r, s),
                s
            }
            ,
            lt.prototype.updateParam = function(t) {
                try {
                    for (var i = !1, e = 0; e < this.motions.length; e++) {
                        var r = this.motions[e];
                        if (null != r) {
                            var o = r._$w0;
                            null != o ? (o.updateParam(t, r),
                            i = !0,
                            r.isFinished() && (this._$eb && n._$Ji("MotionQueueManager[size:%2d]->updateParam() / _$T0 _$w0 (m%d)\n", this.motions.length - 1, r._$sr),
                            this.motions.splice(e, 1),
                            e--)) : (this.motions = this.motions.splice(e, 1),
                            e--)
                        } else
                            this.motions.splice(e, 1),
                            e--
                    }
                    return i
                } catch (t) {
                    return n._$li(t),
                    !0
                }
            }
            ,
            lt.prototype.isFinished = function(t) {
                if (arguments.length >= 1) {
                    for (i = 0; i < this.motions.length; i++)
                        if (null != (e = this.motions[i]) && e._$sr == t && !e.isFinished())
                            return !1;
                    return !0
                }
                for (var i = 0; i < this.motions.length; i++) {
                    var e = this.motions[i];
                    if (null != e)
                        if (null != e._$w0) {
                            if (!e.isFinished())
                                return !1
                        } else
                            this.motions.splice(i, 1),
                            i--;
                    else
                        this.motions.splice(i, 1),
                        i--
                }
                return !0
            }
            ,
            lt.prototype.stopAllMotions = function() {
                for (var t = 0; t < this.motions.length; t++) {
                    var i = this.motions[t];
                    null != i ? (i._$w0,
                    this.motions.splice(t, 1),
                    t--) : (this.motions.splice(t, 1),
                    t--)
                }
            }
            ,
            lt.prototype._$Zr = function(t) {
                this._$eb = t
            }
            ,
            lt.prototype._$e = function() {
                console.log("-- _$R --\n");
                for (var t = 0; t < this.motions.length; t++) {
                    var i = this.motions[t]._$w0;
                    console.log("MotionQueueEnt[%d] :: %s\n", this.motions.length, i.toString())
                }
            }
            ,
            $t._$Gs = 0,
            $t.prototype.isFinished = function() {
                return this._$9L
            }
            ,
            $t.prototype._$qS = function(t) {
                var i = M.getUserTimeMSec() + t;
                (this._$Do < 0 || i < this._$Do) && (this._$Do = i)
            }
            ,
            $t.prototype._$Bs = function() {
                return this._$sr
            }
            ,
            ut.prototype.setContext = function(t) {
                var i = this.m;
                t.transform(i[0], i[1], i[3], i[4], i[6], i[7])
            }
            ,
            ut.prototype.toString = function() {
                for (var t = "LDTransform { ", i = 0; i < 9; i++)
                    t += this.m[i].toFixed(2) + " ,";
                return t += " }"
            }
            ,
            ut.prototype.identity = function() {
                var t = this.m;
                t[0] = t[4] = t[8] = 1,
                t[1] = t[2] = t[3] = t[5] = t[6] = t[7] = 0
            }
            ,
            ut.prototype._$PS = function(t, i, e) {
                null == e && (e = new Array(0,0));
                var r = this.m;
                return e[0] = r[0] * t + r[3] * i + r[6],
                e[1] = r[1] * t + r[4] * i + r[7],
                e
            }
            ,
            ut.prototype._$P2 = function(t) {
                t || (t = new ut);
                var i = this.m
                  , e = i[0]
                  , r = i[1]
                  , o = i[2]
                  , n = i[3]
                  , s = i[4]
                  , _ = i[5]
                  , a = i[6]
                  , h = i[7]
                  , l = i[8]
                  , $ = e * s * l + r * _ * a + o * n * h - e * _ * h - o * s * a - r * n * l;
                if (0 == $)
                    return null;
                var u = 1 / $;
                return t.m[0] = u * (s * l - h * _),
                t.m[1] = u * (h * o - r * l),
                t.m[2] = u * (r * _ - s * o),
                t.m[3] = u * (a * _ - n * l),
                t.m[4] = u * (e * l - a * o),
                t.m[5] = u * (n * o - e * _),
                t.m[6] = u * (n * h - a * s),
                t.m[7] = u * (a * r - e * h),
                t.m[8] = u * (e * s - n * r),
                t
            }
            ,
            ut.prototype.transform = function(t, i, e) {
                null == e && (e = new Array(0,0));
                var r = this.m;
                return e[0] = r[0] * t + r[3] * i + r[6],
                e[1] = r[1] * t + r[4] * i + r[7],
                e
            }
            ,
            ut.prototype.translate = function(t, i) {
                var e = this.m;
                e[6] = e[0] * t + e[3] * i + e[6],
                e[7] = e[1] * t + e[4] * i + e[7],
                e[8] = e[2] * t + e[5] * i + e[8]
            }
            ,
            ut.prototype.scale = function(t, i) {
                var e = this.m;
                e[0] *= t,
                e[1] *= t,
                e[2] *= t,
                e[3] *= i,
                e[4] *= i,
                e[5] *= i
            }
            ,
            ut.prototype.shear = function(t, i) {
                var e = this.m
                  , r = e[0] + e[3] * i
                  , o = e[1] + e[4] * i
                  , n = e[2] + e[5] * i;
                e[3] = e[0] * t + e[3],
                e[4] = e[1] * t + e[4],
                e[5] = e[2] * t + e[5],
                e[0] = r,
                e[1] = o,
                e[2] = n
            }
            ,
            ut.prototype.rotate = function(t) {
                var i = this.m
                  , e = Math.cos(t)
                  , r = Math.sin(t)
                  , o = i[0] * e + i[3] * r
                  , n = i[1] * e + i[4] * r
                  , s = i[2] * e + i[5] * r;
                i[3] = -i[0] * r + i[3] * e,
                i[4] = -i[1] * r + i[4] * e,
                i[5] = -i[2] * r + i[5] * e,
                i[0] = o,
                i[1] = n,
                i[2] = s
            }
            ,
            ut.prototype.concatenate = function(t) {
                var i = this.m
                  , e = t.m
                  , r = i[0] * e[0] + i[3] * e[1] + i[6] * e[2]
                  , o = i[1] * e[0] + i[4] * e[1] + i[7] * e[2]
                  , n = i[2] * e[0] + i[5] * e[1] + i[8] * e[2]
                  , s = i[0] * e[3] + i[3] * e[4] + i[6] * e[5]
                  , _ = i[1] * e[3] + i[4] * e[4] + i[7] * e[5]
                  , a = i[2] * e[3] + i[5] * e[4] + i[8] * e[5]
                  , h = i[0] * e[6] + i[3] * e[7] + i[6] * e[8]
                  , l = i[1] * e[6] + i[4] * e[7] + i[7] * e[8]
                  , $ = i[2] * e[6] + i[5] * e[7] + i[8] * e[8];
                m[0] = r,
                m[1] = o,
                m[2] = n,
                m[3] = s,
                m[4] = _,
                m[5] = a,
                m[6] = h,
                m[7] = l,
                m[8] = $
            }
            ,
            pt.prototype = new Z,
            pt._$eT = null,
            pt._$tP = new Object,
            pt._$2o = function() {
                return null == pt._$eT && (pt._$eT = pt.getID("DST_BASE")),
                pt._$eT
            }
            ,
            pt._$27 = function() {
                pt._$tP.clear(),
                pt._$eT = null
            }
            ,
            pt.getID = function(t) {
                var i = pt._$tP[t];
                return null == i && (i = new pt(t),
                pt._$tP[t] = i),
                i
            }
            ,
            pt.prototype._$3s = function() {
                return new pt
            }
            ,
            ft.prototype = new S,
            ft._$9r = function(t) {
                return new Float32Array(t)
            }
            ,
            ft._$vb = function(t) {
                return new Int16Array(t)
            }
            ,
            ft._$cr = function(t, i) {
                return null == t || t._$yL() < i.length ? ((t = ft._$9r(2 * i.length)).put(i),
                t._$oT(0)) : (t.clear(),
                t.put(i),
                t._$oT(0)),
                t
            }
            ,
            ft._$mb = function(t, i) {
                return null == t || t._$yL() < i.length ? ((t = ft._$vb(2 * i.length)).put(i),
                t._$oT(0)) : (t.clear(),
                t.put(i),
                t._$oT(0)),
                t
            }
            ,
            ft._$Hs = function() {
                return this._$Gr
            }
            ,
            ft._$as = function(t) {
                this._$Gr = t
            }
            ,
            ft.prototype.getGL = function() {
                return this.gl
            }
            ,
            ft.prototype.setGL = function(t) {
                this.gl = t
            }
            ,
            ft.prototype.setTransform = function(t) {
                this.transform = t
            }
            ,
            ft.prototype._$ZT = function() {
                var t = this.gl;
                this.firstDraw && (this.initShader(),
                this.firstDraw = !1,
                this.anisotropyExt = t.getExtension("EXT_texture_filter_anisotropic") || t.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || t.getExtension("MOZ_EXT_texture_filter_anisotropic"),
                this.anisotropyExt && (this.maxAnisotropy = t.getParameter(this.anisotropyExt.MAX_TEXTURE_MAX_ANISOTROPY_EXT))),
                t.disable(t.SCISSOR_TEST),
                t.disable(t.STENCIL_TEST),
                t.disable(t.DEPTH_TEST),
                t.frontFace(t.CW),
                t.enable(t.BLEND),
                t.colorMask(1, 1, 1, 1),
                t.bindBuffer(t.ARRAY_BUFFER, null),
                t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, null)
            }
            ,
            ft.prototype._$Uo = function(t, i, e, r, o, n, s, _) {
                if (!(n < .01 && null == this.clipBufPre_clipContextMask)) {
                    var a = this.gl;
                    if (null == this.gl)
                        throw new Error("gl is null");
                    var h = 1 * this._$C0 * n
                      , l = 1 * this._$tT * n
                      , $ = 1 * this._$WL * n
                      , u = this._$lT * n;
                    if (null != this.clipBufPre_clipContextMask) {
                        a.frontFace(a.CCW),
                        a.useProgram(this.shaderProgram),
                        this._$vS = ct(a, this._$vS, r),
                        this._$no = dt(a, this._$no, e),
                        a.enableVertexAttribArray(this.a_position_Loc),
                        a.vertexAttribPointer(this.a_position_Loc, 2, a.FLOAT, !1, 0, 0),
                        this._$NT = ct(a, this._$NT, o),
                        a.activeTexture(a.TEXTURE1),
                        a.bindTexture(a.TEXTURE_2D, this.textures[t]),
                        a.uniform1i(this.s_texture0_Loc, 1),
                        a.enableVertexAttribArray(this.a_texCoord_Loc),
                        a.vertexAttribPointer(this.a_texCoord_Loc, 2, a.FLOAT, !1, 0, 0),
                        a.uniformMatrix4fv(this.u_matrix_Loc, !1, this.getClipBufPre_clipContextMask().matrixForMask);
                        var p = this.getClipBufPre_clipContextMask().layoutChannelNo
                          , f = this.getChannelFlagAsColor(p);
                        a.uniform4f(this.u_channelFlag, f.r, f.g, f.b, f.a);
                        var c = this.getClipBufPre_clipContextMask().layoutBounds;
                        a.uniform4f(this.u_baseColor_Loc, 2 * c.x - 1, 2 * c.y - 1, 2 * c._$EL() - 1, 2 * c._$5T() - 1),
                        a.uniform1i(this.u_maskFlag_Loc, !0)
                    } else if (null != this.getClipBufPre_clipContextDraw()) {
                        a.useProgram(this.shaderProgramOff),
                        this._$vS = ct(a, this._$vS, r),
                        this._$no = dt(a, this._$no, e),
                        a.enableVertexAttribArray(this.a_position_Loc_Off),
                        a.vertexAttribPointer(this.a_position_Loc_Off, 2, a.FLOAT, !1, 0, 0),
                        this._$NT = ct(a, this._$NT, o),
                        a.activeTexture(a.TEXTURE1),
                        a.bindTexture(a.TEXTURE_2D, this.textures[t]),
                        a.uniform1i(this.s_texture0_Loc_Off, 1),
                        a.enableVertexAttribArray(this.a_texCoord_Loc_Off),
                        a.vertexAttribPointer(this.a_texCoord_Loc_Off, 2, a.FLOAT, !1, 0, 0),
                        a.uniformMatrix4fv(this.u_clipMatrix_Loc_Off, !1, this.getClipBufPre_clipContextDraw().matrixForDraw),
                        a.uniformMatrix4fv(this.u_matrix_Loc_Off, !1, this.matrix4x4),
                        a.activeTexture(a.TEXTURE2),
                        a.bindTexture(a.TEXTURE_2D, rt.fTexture[this.glno]),
                        a.uniform1i(this.s_texture1_Loc_Off, 2);
                        var p = this.getClipBufPre_clipContextDraw().layoutChannelNo
                          , f = this.getChannelFlagAsColor(p);
                        a.uniform4f(this.u_channelFlag_Loc_Off, f.r, f.g, f.b, f.a),
                        a.uniform4f(this.u_baseColor_Loc_Off, h, l, $, u)
                    } else
                        a.useProgram(this.shaderProgram),
                        this._$vS = ct(a, this._$vS, r),
                        this._$no = dt(a, this._$no, e),
                        a.enableVertexAttribArray(this.a_position_Loc),
                        a.vertexAttribPointer(this.a_position_Loc, 2, a.FLOAT, !1, 0, 0),
                        this._$NT = ct(a, this._$NT, o),
                        a.activeTexture(a.TEXTURE1),
                        a.bindTexture(a.TEXTURE_2D, this.textures[t]),
                        a.uniform1i(this.s_texture0_Loc, 1),
                        a.enableVertexAttribArray(this.a_texCoord_Loc),
                        a.vertexAttribPointer(this.a_texCoord_Loc, 2, a.FLOAT, !1, 0, 0),
                        a.uniformMatrix4fv(this.u_matrix_Loc, !1, this.matrix4x4),
                        a.uniform4f(this.u_baseColor_Loc, h, l, $, u),
                        a.uniform1i(this.u_maskFlag_Loc, !1);
                    this.culling ? this.gl.enable(a.CULL_FACE) : this.gl.disable(a.CULL_FACE),
                    this.gl.enable(a.BLEND);
                    var d, g, y, m;
                    if (null != this.clipBufPre_clipContextMask)
                        d = a.ONE,
                        g = a.ONE_MINUS_SRC_ALPHA,
                        y = a.ONE,
                        m = a.ONE_MINUS_SRC_ALPHA;
                    else
                        switch (s) {
                        case st._$ms:
                            d = a.ONE,
                            g = a.ONE_MINUS_SRC_ALPHA,
                            y = a.ONE,
                            m = a.ONE_MINUS_SRC_ALPHA;
                            break;
                        case st._$ns:
                            d = a.ONE,
                            g = a.ONE,
                            y = a.ZERO,
                            m = a.ONE;
                            break;
                        case st._$_s:
                            d = a.DST_COLOR,
                            g = a.ONE_MINUS_SRC_ALPHA,
                            y = a.ZERO,
                            m = a.ONE
                        }
                    a.blendEquationSeparate(a.FUNC_ADD, a.FUNC_ADD),
                    a.blendFuncSeparate(d, g, y, m),
                    this.anisotropyExt && a.texParameteri(a.TEXTURE_2D, this.anisotropyExt.TEXTURE_MAX_ANISOTROPY_EXT, this.maxAnisotropy);
                    var T = e.length;
                    a.drawElements(a.TRIANGLES, T, a.UNSIGNED_SHORT, 0),
                    a.bindTexture(a.TEXTURE_2D, null)
                }
            }
            ,
            ft.prototype._$Rs = function() {
                throw new Error("_$Rs")
            }
            ,
            ft.prototype._$Ds = function(t) {
                throw new Error("_$Ds")
            }
            ,
            ft.prototype._$K2 = function() {
                for (var t = 0; t < this.textures.length; t++)
                    0 != this.textures[t] && (this.gl._$K2(1, this.textures, t),
                    this.textures[t] = null)
            }
            ,
            ft.prototype.setTexture = function(t, i) {
                this.textures[t] = i
            }
            ,
            ft.prototype.initShader = function() {
                var t = this.gl;
                this.loadShaders2(),
                this.a_position_Loc = t.getAttribLocation(this.shaderProgram, "a_position"),
                this.a_texCoord_Loc = t.getAttribLocation(this.shaderProgram, "a_texCoord"),
                this.u_matrix_Loc = t.getUniformLocation(this.shaderProgram, "u_mvpMatrix"),
                this.s_texture0_Loc = t.getUniformLocation(this.shaderProgram, "s_texture0"),
                this.u_channelFlag = t.getUniformLocation(this.shaderProgram, "u_channelFlag"),
                this.u_baseColor_Loc = t.getUniformLocation(this.shaderProgram, "u_baseColor"),
                this.u_maskFlag_Loc = t.getUniformLocation(this.shaderProgram, "u_maskFlag"),
                this.a_position_Loc_Off = t.getAttribLocation(this.shaderProgramOff, "a_position"),
                this.a_texCoord_Loc_Off = t.getAttribLocation(this.shaderProgramOff, "a_texCoord"),
                this.u_matrix_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "u_mvpMatrix"),
                this.u_clipMatrix_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "u_ClipMatrix"),
                this.s_texture0_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "s_texture0"),
                this.s_texture1_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "s_texture1"),
                this.u_channelFlag_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "u_channelFlag"),
                this.u_baseColor_Loc_Off = t.getUniformLocation(this.shaderProgramOff, "u_baseColor")
            }
            ,
            ft.prototype.disposeShader = function() {
                var t = this.gl;
                this.shaderProgram && (t.deleteProgram(this.shaderProgram),
                this.shaderProgram = null),
                this.shaderProgramOff && (t.deleteProgram(this.shaderProgramOff),
                this.shaderProgramOff = null)
            }
            ,
            ft.prototype.compileShader = function(t, i) {
                var e = this.gl
                  , r = i
                  , o = e.createShader(t);
                if (null == o)
                    return n._$Ji("_$L0 to create shader"),
                    null;
                if (e.shaderSource(o, r),
                e.compileShader(o),
                !e.getShaderParameter(o, e.COMPILE_STATUS)) {
                    var s = e.getShaderInfoLog(o);
                    return n._$Ji("_$L0 to compile shader : " + s),
                    e.deleteShader(o),
                    null
                }
                return o
            }
            ,
            ft.prototype.loadShaders2 = function() {
                var t = this.gl;
                if (this.shaderProgram = t.createProgram(),
                !this.shaderProgram)
                    return !1;
                if (this.shaderProgramOff = t.createProgram(),
                !this.shaderProgramOff)
                    return !1;
                if (this.vertShader = this.compileShader(t.VERTEX_SHADER, "attribute vec4     a_position;attribute vec2     a_texCoord;varying vec2       v_texCoord;varying vec4       v_ClipPos;uniform mat4       u_mvpMatrix;void main(){    gl_Position = u_mvpMatrix * a_position;    v_ClipPos = u_mvpMatrix * a_position;    v_texCoord = a_texCoord;}"),
                !this.vertShader)
                    return n._$Ji("Vertex shader compile _$li!"),
                    !1;
                if (this.vertShaderOff = this.compileShader(t.VERTEX_SHADER, "attribute vec4     a_position;attribute vec2     a_texCoord;varying vec2       v_texCoord;varying vec4       v_ClipPos;uniform mat4       u_mvpMatrix;uniform mat4       u_ClipMatrix;void main(){    gl_Position = u_mvpMatrix * a_position;    v_ClipPos = u_ClipMatrix * a_position;    v_texCoord = a_texCoord ;}"),
                !this.vertShaderOff)
                    return n._$Ji("OffVertex shader compile _$li!"),
                    !1;
                if (this.fragShader = this.compileShader(t.FRAGMENT_SHADER, "precision mediump float;varying vec2       v_texCoord;varying vec4       v_ClipPos;uniform sampler2D  s_texture0;uniform vec4       u_channelFlag;uniform vec4       u_baseColor;uniform bool       u_maskFlag;void main(){    vec4 smpColor;     if(u_maskFlag){        float isInside =             step(u_baseColor.x, v_ClipPos.x/v_ClipPos.w)          * step(u_baseColor.y, v_ClipPos.y/v_ClipPos.w)          * step(v_ClipPos.x/v_ClipPos.w, u_baseColor.z)          * step(v_ClipPos.y/v_ClipPos.w, u_baseColor.w);        smpColor = u_channelFlag * texture2D(s_texture0 , v_texCoord).a * isInside;    }else{        smpColor = texture2D(s_texture0 , v_texCoord) * u_baseColor;    }    gl_FragColor = smpColor;}"),
                !this.fragShader)
                    return n._$Ji("Fragment shader compile _$li!"),
                    !1;
                if (this.fragShaderOff = this.compileShader(t.FRAGMENT_SHADER, "precision mediump float ;varying vec2       v_texCoord;varying vec4       v_ClipPos;uniform sampler2D  s_texture0;uniform sampler2D  s_texture1;uniform vec4       u_channelFlag;uniform vec4       u_baseColor ;void main(){    vec4 col_formask = texture2D(s_texture0, v_texCoord) * u_baseColor;    vec4 clipMask = texture2D(s_texture1, v_ClipPos.xy / v_ClipPos.w) * u_channelFlag;    float maskVal = clipMask.r + clipMask.g + clipMask.b + clipMask.a;    col_formask = col_formask * maskVal;    gl_FragColor = col_formask;}"),
                !this.fragShaderOff)
                    return n._$Ji("OffFragment shader compile _$li!"),
                    !1;
                if (t.attachShader(this.shaderProgram, this.vertShader),
                t.attachShader(this.shaderProgram, this.fragShader),
                t.attachShader(this.shaderProgramOff, this.vertShaderOff),
                t.attachShader(this.shaderProgramOff, this.fragShaderOff),
                t.linkProgram(this.shaderProgram),
                t.linkProgram(this.shaderProgramOff),
                !t.getProgramParameter(this.shaderProgram, t.LINK_STATUS)) {
                    var i = t.getProgramInfoLog(this.shaderProgram);
                    return n._$Ji("_$L0 to link program: " + i),
                    this.vertShader && (t.deleteShader(this.vertShader),
                    this.vertShader = 0),
                    this.fragShader && (t.deleteShader(this.fragShader),
                    this.fragShader = 0),
                    this.shaderProgram && (t.deleteProgram(this.shaderProgram),
                    this.shaderProgram = 0),
                    this.vertShaderOff && (t.deleteShader(this.vertShaderOff),
                    this.vertShaderOff = 0),
                    this.fragShaderOff && (t.deleteShader(this.fragShaderOff),
                    this.fragShaderOff = 0),
                    this.shaderProgramOff && (t.deleteProgram(this.shaderProgramOff),
                    this.shaderProgramOff = 0),
                    !1
                }
                return !0
            }
            ,
            ft.prototype.createFramebuffer = function() {
                var t = this.gl
                  , i = rt.clippingMaskBufferSize
                  , e = t.createFramebuffer();
                t.bindFramebuffer(t.FRAMEBUFFER, e);
                var r = t.createRenderbuffer();
                t.bindRenderbuffer(t.RENDERBUFFER, r),
                t.renderbufferStorage(t.RENDERBUFFER, t.RGBA4, i, i),
                t.framebufferRenderbuffer(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.RENDERBUFFER, r);
                var o = t.createTexture();
                return t.bindTexture(t.TEXTURE_2D, o),
                t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, i, i, 0, t.RGBA, t.UNSIGNED_BYTE, null),
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR),
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR),
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
                t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE),
                t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, o, 0),
                t.bindTexture(t.TEXTURE_2D, null),
                t.bindRenderbuffer(t.RENDERBUFFER, null),
                t.bindFramebuffer(t.FRAMEBUFFER, null),
                rt.fTexture[this.glno] = o,
                {
                    framebuffer: e,
                    renderbuffer: r,
                    texture: rt.fTexture[this.glno]
                }
            }
            ,
            gt.prototype._$fP = function() {
                var t, i, e, r = this._$ST();
                if (0 == (128 & r))
                    return 255 & r;
                if (0 == (128 & (t = this._$ST())))
                    return (127 & r) << 7 | 127 & t;
                if (0 == (128 & (i = this._$ST())))
                    return (127 & r) << 14 | (127 & t) << 7 | 255 & i;
                if (0 == (128 & (e = this._$ST())))
                    return (127 & r) << 21 | (127 & t) << 14 | (127 & i) << 7 | 255 & e;
                throw new nt("_$L _$0P  _")
            }
            ,
            gt.prototype.getFormatVersion = function() {
                return this._$S2
            }
            ,
            gt.prototype._$gr = function(t) {
                this._$S2 = t
            }
            ,
            gt.prototype._$3L = function() {
                return this._$fP()
            }
            ,
            gt.prototype._$mP = function() {
                return this._$zT(),
                this._$F += 8,
                this._$T.getFloat64(this._$F - 8)
            }
            ,
            gt.prototype._$_T = function() {
                return this._$zT(),
                this._$F += 4,
                this._$T.getFloat32(this._$F - 4)
            }
            ,
            gt.prototype._$6L = function() {
                return this._$zT(),
                this._$F += 4,
                this._$T.getInt32(this._$F - 4)
            }
            ,
            gt.prototype._$ST = function() {
                return this._$zT(),
                this._$T.getInt8(this._$F++)
            }
            ,
            gt.prototype._$9T = function() {
                return this._$zT(),
                this._$F += 2,
                this._$T.getInt16(this._$F - 2)
            }
            ,
            gt.prototype._$2T = function() {
                throw this._$zT(),
                this._$F += 8,
                new nt("_$L _$q read long")
            }
            ,
            gt.prototype._$po = function() {
                return this._$zT(),
                0 != this._$T.getInt8(this._$F++)
            }
            ;
            var vt = !0;
            gt.prototype._$bT = function() {
                this._$zT();
                var t = this._$3L()
                  , i = null;
                if (vt)
                    try {
                        var e = new ArrayBuffer(2 * t);
                        for (i = new Uint16Array(e),
                        o = 0; o < t; ++o)
                            i[o] = this._$T.getUint8(this._$F++);
                        return String.fromCharCode.apply(null, i)
                    } catch (t) {
                        vt = !1
                    }
                try {
                    var r = new Array;
                    if (null == i)
                        for (o = 0; o < t; ++o)
                            r[o] = this._$T.getUint8(this._$F++);
                    else
                        for (var o = 0; o < t; ++o)
                            r[o] = i[o];
                    return String.fromCharCode.apply(null, r)
                } catch (t) {
                    console.log("read utf8 / _$rT _$L0 !! : " + t)
                }
            }
            ,
            gt.prototype._$cS = function() {
                this._$zT();
                for (var t = this._$3L(), i = new Int32Array(t), e = 0; e < t; e++)
                    i[e] = this._$T.getInt32(this._$F),
                    this._$F += 4;
                return i
            }
            ,
            gt.prototype._$Tb = function() {
                this._$zT();
                for (var t = this._$3L(), i = new Float32Array(t), e = 0; e < t; e++)
                    i[e] = this._$T.getFloat32(this._$F),
                    this._$F += 4;
                return i
            }
            ,
            gt.prototype._$5b = function() {
                this._$zT();
                for (var t = this._$3L(), i = new Float64Array(t), e = 0; e < t; e++)
                    i[e] = this._$T.getFloat64(this._$F),
                    this._$F += 8;
                return i
            }
            ,
            gt.prototype._$nP = function() {
                return this._$Jb(-1)
            }
            ,
            gt.prototype._$Jb = function(t) {
                if (this._$zT(),
                t < 0 && (t = this._$3L()),
                t == C._$7P) {
                    var i = this._$6L();
                    if (0 <= i && i < this._$Ko.length)
                        return this._$Ko[i];
                    throw new nt("_$sL _$4i @_$m0")
                }
                var e = this._$4b(t);
                return this._$Ko.push(e),
                e
            }
            ,
            gt.prototype._$4b = function(t) {
                if (0 == t)
                    return null;
                if (50 == t)
                    return i = this._$bT(),
                    o = x.getID(i);
                if (51 == t)
                    return i = this._$bT(),
                    o = pt.getID(i);
                if (134 == t)
                    return i = this._$bT(),
                    o = _.getID(i);
                if (60 == t) {
                    var i = this._$bT();
                    return o = a.getID(i)
                }
                if (t >= 48) {
                    var e = C._$9o(t);
                    return null != e ? (e._$F0(this),
                    e) : null
                }
                switch (t) {
                case 1:
                    return this._$bT();
                case 10:
                    return new function() {
                        Lt || (this.color = null)
                    }
                    (this._$6L(),!0);
                case 11:
                    return new g(this._$mP(),this._$mP(),this._$mP(),this._$mP());
                case 12:
                    return new g(this._$_T(),this._$_T(),this._$_T(),this._$_T());
                case 13:
                    return new T(this._$mP(),this._$mP());
                case 14:
                    return new T(this._$_T(),this._$_T());
                case 15:
                    for (var r = this._$3L(), o = new Array(r), n = 0; n < r; n++)
                        o[n] = this._$nP();
                    return o;
                case 17:
                    return o = new O(this._$mP(),this._$mP(),this._$mP(),this._$mP(),this._$mP(),this._$mP());
                case 21:
                    return new s(this._$6L(),this._$6L(),this._$6L(),this._$6L());
                case 22:
                    return new at(this._$6L(),this._$6L());
                case 23:
                    throw new Error("_$L _$ro ");
                case 16:
                case 25:
                    return this._$cS();
                case 26:
                    return this._$5b();
                case 27:
                    return this._$Tb();
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 18:
                case 19:
                case 20:
                case 24:
                case 28:
                    throw new nt("_$6 _$q : _$nP() of 2-9 ,18,19,20,24,28 : " + t);
                default:
                    throw new nt("_$6 _$q : _$nP() NO _$i : " + t)
                }
            }
            ,
            gt.prototype._$8L = function() {
                return 0 == this._$hL ? this._$v0 = this._$ST() : 8 == this._$hL && (this._$v0 = this._$ST(),
                this._$hL = 0),
                1 == (this._$v0 >> 7 - this._$hL++ & 1)
            }
            ,
            gt.prototype._$zT = function() {
                0 != this._$hL && (this._$hL = 0)
            }
            ,
            function() {}
            .prototype._$wP = function(t, i, e) {
                for (var r = 0; r < e; r++) {
                    for (var o = 0; o < i; o++) {
                        var n = 2 * (o + r * i);
                        console.log("(% 7.3f , % 7.3f) , ", t[n], t[n + 1])
                    }
                    console.log("\n")
                }
                console.log("\n")
            }
            ,
            yt._$2S = Math.PI / 180,
            yt._$bS = Math.PI / 180,
            yt._$wS = 180 / Math.PI,
            yt._$NS = 180 / Math.PI,
            yt.PI_F = Math.PI,
            yt._$kT = [0, .012368, .024734, .037097, .049454, .061803, .074143, .086471, .098786, .111087, .12337, .135634, .147877, .160098, .172295, .184465, .196606, .208718, .220798, .232844, .244854, .256827, .268761, .280654, .292503, .304308, .316066, .327776, .339436, .351044, .362598, .374097, .385538, .396921, .408243, .419502, .430697, .441826, .452888, .463881, .474802, .485651, .496425, .507124, .517745, .528287, .538748, .549126, .559421, .56963, .579752, .589785, .599728, .609579, .619337, .629, .638567, .648036, .657406, .666676, .675843, .684908, .693867, .70272, .711466, .720103, .72863, .737045, .745348, .753536, .76161, .769566, .777405, .785125, .792725, .800204, .807561, .814793, .821901, .828884, .835739, .842467, .849066, .855535, .861873, .868079, .874153, .880093, .885898, .891567, .897101, .902497, .907754, .912873, .917853, .922692, .92739, .931946, .936359, .940629, .944755, .948737, .952574, .956265, .959809, .963207, .966457, .96956, .972514, .97532, .977976, .980482, .982839, .985045, .987101, .989006, .990759, .992361, .993811, .995109, .996254, .997248, .998088, .998776, .999312, .999694, .999924, 1],
            yt._$92 = function(t, i) {
                var e = Math.atan2(t[1], t[0])
                  , r = Math.atan2(i[1], i[0]);
                return yt._$tS(e, r)
            }
            ,
            yt._$tS = function(t, i) {
                for (var e = t - i; e < -Math.PI; )
                    e += 2 * Math.PI;
                for (; e > Math.PI; )
                    e -= 2 * Math.PI;
                return e
            }
            ,
            yt._$9 = function(t) {
                return Math.sin(t)
            }
            ,
            yt.fcos = function(t) {
                return Math.cos(t)
            }
            ,
            mt.prototype._$u2 = function() {
                return this._$IS[0]
            }
            ,
            mt.prototype._$yo = function() {
                return this._$AT && !this._$IS[0]
            }
            ,
            mt.prototype._$GT = function() {
                return this._$e0
            }
            ,
            Tt._$W2 = 0,
            Tt.SYSTEM_INFO = null,
            Tt.USER_AGENT = navigator.userAgent,
            Tt.isIPhone = function() {
                return Tt.SYSTEM_INFO || Tt.setup(),
                Tt.SYSTEM_INFO._isIPhone
            }
            ,
            Tt.isIOS = function() {
                return Tt.SYSTEM_INFO || Tt.setup(),
                Tt.SYSTEM_INFO._isIPhone || Tt.SYSTEM_INFO._isIPad
            }
            ,
            Tt.isAndroid = function() {
                return Tt.SYSTEM_INFO || Tt.setup(),
                Tt.SYSTEM_INFO._isAndroid
            }
            ,
            Tt.getOSVersion = function() {
                return Tt.SYSTEM_INFO || Tt.setup(),
                Tt.SYSTEM_INFO.version
            }
            ,
            Tt.getOS = function() {
                return Tt.SYSTEM_INFO || Tt.setup(),
                Tt.SYSTEM_INFO._isIPhone || Tt.SYSTEM_INFO._isIPad ? "iOS" : Tt.SYSTEM_INFO._isAndroid ? "Android" : "_$Q0 OS"
            }
            ,
            Tt.setup = function() {
                function t(t, i) {
                    for (var e = t.substring(i).split(/[ _,;\.]/), r = 0, o = 0; o <= 2 && !isNaN(e[o]); o++) {
                        var s = parseInt(e[o]);
                        if (s < 0 || s > 999) {
                            n._$li("err : " + s + " @UtHtml5.setup()"),
                            r = 0;
                            break
                        }
                        r += s * Math.pow(1e3, 2 - o)
                    }
                    return r
                }
                var i, e = Tt.USER_AGENT, r = Tt.SYSTEM_INFO = {
                    userAgent: e
                };
                if ((i = e.indexOf("iPhone OS ")) >= 0)
                    r.os = "iPhone",
                    r._isIPhone = !0,
                    r.version = t(e, i + "iPhone OS ".length);
                else if ((i = e.indexOf("iPad")) >= 0) {
                    if ((i = e.indexOf("CPU OS")) < 0)
                        return void n._$li(" err : " + e + " @UtHtml5.setup()");
                    r.os = "iPad",
                    r._isIPad = !0,
                    r.version = t(e, i + "CPU OS ".length)
                } else
                    (i = e.indexOf("Android")) >= 0 ? (r.os = "Android",
                    r._isAndroid = !0,
                    r.version = t(e, i + "Android ".length)) : (r.os = "-",
                    r.version = -1)
            }
            ,
            window.UtSystem = M,
            window.UtDebug = n,
            window.LDTransform = ut,
            window.LDGL = tt,
            window.Live2D = rt,
            window.Live2DModelWebGL = ht,
            window.Live2DModelJS = z,
            window.Live2DMotion = H,
            window.MotionQueueManager = lt,
            window.PhysicsHair = l,
            window.AMotion = o,
            window.PartsDataID = _,
            window.DrawDataID = x,
            window.BaseDataID = pt,
            window.ParamID = a,
            rt.init();
            var Lt = !1
        }()
    }
    ).call(i, e(7))
}
, function(t, i) {
    t.exports = {
        import: function() {
            throw new Error("System.import cannot be used indirectly")
        }
    }
}
, function(t, i, e) {
    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    function o() {
        this.models = [],
        this.count = -1,
        this.reloadFlg = !1,
        Live2D.init(),
        n.Live2DFramework.setPlatformManager(new s.default)
    }
    Object.defineProperty(i, "__esModule", {
        value: !0
    }),
    i.default = o;
    var n = e(0)
      , s = r(e(9))
      , _ = r(e(10))
      , a = r(e(1));
    o.prototype.createModel = function() {
        var t = new _.default;
        return this.models.push(t),
        t
    }
    ,
    o.prototype.changeModel = function(t, i) {
        this.reloadFlg && (this.reloadFlg = !1,
        this.releaseModel(0, t),
        this.createModel(),
        this.models[0].load(t, i))
    }
    ,
    o.prototype.getModel = function(t) {
        return t >= this.models.length ? null : this.models[t]
    }
    ,
    o.prototype.releaseModel = function(t, i) {
        this.models.length <= t || (this.models[t].release(i),
        delete this.models[t],
        this.models.splice(t, 1))
    }
    ,
    o.prototype.numModels = function() {
        return this.models.length
    }
    ,
    o.prototype.setDrag = function(t, i) {
        for (var e = 0; e < this.models.length; e++)
            this.models[e].setDrag(t, i)
    }
    ,
    o.prototype.maxScaleEvent = function() {
        a.default.DEBUG_LOG && console.log("Max scale event.");
        for (var t = 0; t < this.models.length; t++)
            this.models[t].startRandomMotion(a.default.MOTION_GROUP_PINCH_IN, a.default.PRIORITY_NORMAL)
    }
    ,
    o.prototype.minScaleEvent = function() {
        a.default.DEBUG_LOG && console.log("Min scale event.");
        for (var t = 0; t < this.models.length; t++)
            this.models[t].startRandomMotion(a.default.MOTION_GROUP_PINCH_OUT, a.default.PRIORITY_NORMAL)
    }
    ,
    o.prototype.tapEvent = function(t, i) {
        a.default.DEBUG_LOG && console.log("tapEvent view x:" + t + " y:" + i);
        for (var e = 0; e < this.models.length; e++)
            this.models[e].hitTest(a.default.HIT_AREA_HEAD, t, i) ? (a.default.DEBUG_LOG && console.log("Tap face."),
            this.models[e].setRandomExpression()) : this.models[e].hitTest(a.default.HIT_AREA_BODY, t, i) ? (a.default.DEBUG_LOG && console.log("Tap body. models[" + e + "]"),
            this.models[e].startRandomMotion(a.default.MOTION_GROUP_TAP_BODY, a.default.PRIORITY_NORMAL)) : this.models[e].hitTestCustom("head", t, i) ? (a.default.DEBUG_LOG && console.log("Tap face."),
            this.models[e].startRandomMotion(a.default.MOTION_GROUP_FLICK_HEAD, a.default.PRIORITY_NORMAL)) : this.models[e].hitTestCustom("body", t, i) && (a.default.DEBUG_LOG && console.log("Tap body. models[" + e + "]"),
            this.models[e].startRandomMotion(a.default.MOTION_GROUP_TAP_BODY, a.default.PRIORITY_NORMAL));
        return !0
    }
}
, function(t, i, e) {
    function r() {}
    Object.defineProperty(i, "__esModule", {
        value: !0
    }),
    i.default = r;
    var o = e(2);
    r.prototype.loadBytes = function(t, i) {
        var e = new XMLHttpRequest;
        e.open("GET", t, !0),
        e.responseType = "arraybuffer",
        e.onload = function() {
            switch (e.status) {
            case 200:
                i(e.response);
                break;
            default:
                console.error("Failed to load (" + e.status + ") : " + t)
            }
        }
        ,
        e.send(null)
    }
    ,
    r.prototype.loadString = function(t) {
        this.loadBytes(t, function(t) {
            return t
        })
    }
    ,
    r.prototype.loadLive2DModel = function(t, i) {
        var e = null;
        this.loadBytes(t, function(t) {
            e = Live2DModelWebGL.loadModel(t),
            i(e)
        })
    }
    ,
    r.prototype.loadTexture = function(t, i, e, r) {
        var n = new Image;
        n.crossOrigin = "Anonymous",
        n.onload = function() {
            var e = (0,
            o.getContext)()
              , s = e.createTexture();
            if (!s)
                return console.error("Failed to generate gl texture name."),
                -1;
            0 == t.isPremultipliedAlpha() && e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1),
            e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, 1),
            e.activeTexture(e.TEXTURE0),
            e.bindTexture(e.TEXTURE_2D, s),
            e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, n),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR_MIPMAP_NEAREST),
            e.generateMipmap(e.TEXTURE_2D),
            t.setTexture(i, s),
            s = null,
            "function" == typeof r && r()
        }
        ,
        n.onerror = function() {
            console.error("Failed to load image : " + e)
        }
        ,
        n.src = e,
        (n.complete || void 0 === n.complete) && (n.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
        n.src = e)
    }
    ,
    r.prototype.jsonParseFromBytes = function(t) {
        var i, e = new Uint8Array(t,0,3);
        return i = 239 == e[0] && 187 == e[1] && 191 == e[2] ? String.fromCharCode.apply(null, new Uint8Array(t,3)) : String.fromCharCode.apply(null, new Uint8Array(t)),
        JSON.parse(i)
    }
    ,
    r.prototype.log = function(t) {}
}
, function(t, i, e) {
    function r(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    function o() {
        n.L2DBaseModel.prototype.constructor.call(this),
        this.modelHomeDir = "",
        this.modelSetting = null,
        this.tmpMatrix = []
    }
    Object.defineProperty(i, "__esModule", {
        value: !0
    }),
    i.default = o;
    var n = e(0)
      , s = r(e(11))
      , _ = r(e(1))
      , a = r(e(3));
    (o.prototype = new n.L2DBaseModel).load = function(t, i, e) {
        this.setUpdating(!0),
        this.setInitialized(!1),
        this.modelHomeDir = i.substring(0, i.lastIndexOf("/") + 1),
        this.modelSetting = new s.default;
        var r = this;
        this.modelSetting.loadModelSetting(i, function() {
        	if (window.location.href.includes(live2d_var.homeurl)) {
                var t = r.modelHomeDir + r.modelSetting.getModelFile();
                r.loadModelData(t, function(t) {
                    for (var i = 0; i < r.modelSetting.getTextureNum(); i++) {
                        var o = r.modelSetting.getTextureFile(i);
                        r.loadTexture(i, o, function() {
                            if (r.isTexLoaded) {
                                if (r.modelSetting.getExpressionNum() > 0)
                                    for (r.expressions = {},
                                    s = 0; s < r.modelSetting.getExpressionNum(); s++) {
                                        var t = r.modelSetting.getExpressionName(s)
                                          , i = r.modelHomeDir + r.modelSetting.getExpressionFile(s);
                                        r.loadExpression(t, i)
                                    }
                                else
                                    r.expressionManager = null,
                                    r.expressions = {};
                                if (r.eyeBlink,
                                null != r.modelSetting.getPhysicsFile() ? r.loadPhysics(r.modelHomeDir + r.modelSetting.getPhysicsFile()) : r.physics = null,
                                null != r.modelSetting.getPoseFile() ? r.loadPose(r.modelHomeDir + r.modelSetting.getPoseFile(), function() {
                                    r.pose.updateParam(r.live2DModel)
                                }) : r.pose = null,
                                null != r.modelSetting.getLayout()) {
                                    var o = r.modelSetting.getLayout();
                                    null != o.width && r.modelMatrix.setWidth(o.width),
                                    null != o.height && r.modelMatrix.setHeight(o.height),
                                    null != o.x && r.modelMatrix.setX(o.x),
                                    null != o.y && r.modelMatrix.setY(o.y),
                                    null != o.center_x && r.modelMatrix.centerX(o.center_x),
                                    null != o.center_y && r.modelMatrix.centerY(o.center_y),
                                    null != o.top && r.modelMatrix.top(o.top),
                                    null != o.bottom && r.modelMatrix.bottom(o.bottom),
                                    null != o.left && r.modelMatrix.left(o.left),
                                    null != o.right && r.modelMatrix.right(o.right)
                                }
                                if (null != r.modelSetting.getHitAreasCustom()) {
                                    var n = r.modelSetting.getHitAreasCustom();
                                    null != n.head_x && (_.default.hit_areas_custom_head_x = n.head_x),
                                    null != n.head_y && (_.default.hit_areas_custom_head_y = n.head_y),
                                    null != n.body_x && (_.default.hit_areas_custom_body_x = n.body_x),
                                    null != n.body_y && (_.default.hit_areas_custom_body_y = n.body_y)
                                }
                                for (s = 0; s < r.modelSetting.getInitParamNum(); s++)
                                    r.live2DModel.setParamFloat(r.modelSetting.getInitParamID(s), r.modelSetting.getInitParamValue(s));
                                for (var s = 0; s < r.modelSetting.getInitPartsVisibleNum(); s++)
                                    r.live2DModel.setPartsOpacity(r.modelSetting.getInitPartsVisibleID(s), r.modelSetting.getInitPartsVisibleValue(s));
                                r.live2DModel.saveParam(),
                                r.preloadMotionGroup(_.default.MOTION_GROUP_IDLE),
                                r.preloadMotionGroup(_.default.MOTION_GROUP_SLEEPY),
                                r.mainMotionManager.stopAllMotions(),
                                r.setUpdating(!1),
                                r.setInitialized(!0),
                                "function" == typeof e && e()
                            }
                        })
                    }
                })
            }
        })
    }
    ,
    o.prototype.release = function(t) {
        var i = Live2DFramework.getPlatformManager();
        t.deleteTexture(i.texture)
    }
    ,
    o.prototype.preloadMotionGroup = function(t) {
        for (var i = this, e = 0; e < this.modelSetting.getMotionNum(t); e++) {
            var r = this.modelSetting.getMotionFile(t, e);
            this.loadMotion(r, this.modelHomeDir + r, function(r) {
                r.setFadeIn(i.modelSetting.getMotionFadeIn(t, e)),
                r.setFadeOut(i.modelSetting.getMotionFadeOut(t, e))
            })
        }
    }
    ,
    o.prototype.update = function() {
        if (null != this.live2DModel) {
            var t = (UtSystem.getUserTimeMSec() - this.startTimeMSec) / 1e3 * 2 * Math.PI;
            this.mainMotionManager.isFinished() && ("1" === sessionStorage.getItem("Sleepy") ? this.startRandomMotion(_.default.MOTION_GROUP_SLEEPY, _.default.PRIORITY_SLEEPY) : this.startRandomMotion(_.default.MOTION_GROUP_IDLE, _.default.PRIORITY_IDLE)),
            this.live2DModel.loadParam(),
            this.mainMotionManager.updateParam(this.live2DModel) || null != this.eyeBlink && this.eyeBlink.updateParam(this.live2DModel),
            this.live2DModel.saveParam(),
            null == this.expressionManager || null == this.expressions || this.expressionManager.isFinished() || this.expressionManager.updateParam(this.live2DModel),
            this.live2DModel.addToParamFloat("PARAM_ANGLE_X", 30 * this.dragX, 1),
            this.live2DModel.addToParamFloat("PARAM_ANGLE_Y", 30 * this.dragY, 1),
            this.live2DModel.addToParamFloat("PARAM_ANGLE_Z", this.dragX * this.dragY * -30, 1),
            this.live2DModel.addToParamFloat("PARAM_BODY_ANGLE_X", 10 * this.dragX, 1),
            this.live2DModel.addToParamFloat("PARAM_EYE_BALL_X", this.dragX, 1),
            this.live2DModel.addToParamFloat("PARAM_EYE_BALL_Y", this.dragY, 1),
            this.live2DModel.addToParamFloat("PARAM_ANGLE_X", Number(15 * Math.sin(t / 6.5345)), .5),
            this.live2DModel.addToParamFloat("PARAM_ANGLE_Y", Number(8 * Math.sin(t / 3.5345)), .5),
            this.live2DModel.addToParamFloat("PARAM_ANGLE_Z", Number(10 * Math.sin(t / 5.5345)), .5),
            this.live2DModel.addToParamFloat("PARAM_BODY_ANGLE_X", Number(4 * Math.sin(t / 15.5345)), .5),
            this.live2DModel.setParamFloat("PARAM_BREATH", Number(.5 + .5 * Math.sin(t / 3.2345)), 1),
            null != this.physics && this.physics.updateParam(this.live2DModel),
            null == this.lipSync && this.live2DModel.setParamFloat("PARAM_MOUTH_OPEN_Y", this.lipSyncValue),
            null != this.pose && this.pose.updateParam(this.live2DModel),
            this.live2DModel.update()
        } else
            _.default.DEBUG_LOG && console.error("Failed to update.")
    }
    ,
    o.prototype.setRandomExpression = function() {
        var t = [];
        for (var i in this.expressions)
            t.push(i);
        var e = parseInt(Math.random() * t.length);
        this.setExpression(t[e])
    }
    ,
    o.prototype.startRandomMotion = function(t, i) {
        var e = this.modelSetting.getMotionNum(t)
          , r = parseInt(Math.random() * e);
        this.startMotion(t, r, i)
    }
    ,
    o.prototype.startMotion = function(t, i, e) {
        var r = this.modelSetting.getMotionFile(t, i);
        if (null != r && "" != r) {
            if (e == _.default.PRIORITY_FORCE)
                this.mainMotionManager.setReservePriority(e);
            else if (!this.mainMotionManager.reserveMotion(e))
                return void (_.default.DEBUG_LOG && console.log("Motion is running."));
            var o, n = this;
            null == this.motions[t] ? this.loadMotion(null, this.modelHomeDir + r, function(r) {
                o = r,
                n.setFadeInFadeOut(t, i, e, o)
            }) : (o = this.motions[t],
            n.setFadeInFadeOut(t, i, e, o))
        } else
            _.default.DEBUG_LOG && console.error("Failed to motion.")
    }
    ,
    o.prototype.setFadeInFadeOut = function(t, i, e, r) {
        var o = this.modelSetting.getMotionFile(t, i);
        if (r.setFadeIn(this.modelSetting.getMotionFadeIn(t, i)),
        r.setFadeOut(this.modelSetting.getMotionFadeOut(t, i)),
        _.default.DEBUG_LOG && console.log("Start motion : " + o),
        null == this.modelSetting.getMotionSound(t, i))
            this.mainMotionManager.startMotionPrio(r, e);
        else {
            var n = this.modelSetting.getMotionSound(t, i)
              , s = document.createElement("audio");
            s.src = this.modelHomeDir + n,
            _.default.DEBUG_LOG && console.log("Start sound : " + n),
            s.play(),
            this.mainMotionManager.startMotionPrio(r, e)
        }
    }
    ,
    o.prototype.setExpression = function(t) {
        var i = this.expressions[t];
        _.default.DEBUG_LOG && console.log("Expression : " + t),
        this.expressionManager.startMotion(i, !1)
    }
    ,
    o.prototype.draw = function(t) {
        a.default.push(),
        a.default.multMatrix(this.modelMatrix.getArray()),
        this.tmpMatrix = a.default.getMatrix(),
        this.live2DModel.setMatrix(this.tmpMatrix),
        this.live2DModel.draw(),
        a.default.pop()
    }
    ,
    o.prototype.hitTest = function(t, i, e) {
        for (var r = this.modelSetting.getHitAreaNum(), o = 0; o < r; o++)
            if (t == this.modelSetting.getHitAreaName(o)) {
                var n = this.modelSetting.getHitAreaID(o);
                return this.hitTestSimple(n, i, e)
            }
        return !1
    }
    ,
    o.prototype.hitTestCustom = function(t, i, e) {
        return "head" == t ? this.hitTestSimpleCustom(_.default.hit_areas_custom_head_x, _.default.hit_areas_custom_head_y, i, e) : "body" == t && this.hitTestSimpleCustom(_.default.hit_areas_custom_body_x, _.default.hit_areas_custom_body_y, i, e)
    }
}
, function(t, i, e) {
    function r() {
        this.NAME = "name",
        this.ID = "id",
        this.MODEL = "model",
        this.TEXTURES = "textures",
        this.HIT_AREAS = "hit_areas",
        this.PHYSICS = "physics",
        this.POSE = "pose",
        this.EXPRESSIONS = "expressions",
        this.MOTION_GROUPS = "motions",
        this.SOUND = "sound",
        this.FADE_IN = "fade_in",
        this.FADE_OUT = "fade_out",
        this.LAYOUT = "layout",
        this.HIT_AREAS_CUSTOM = "hit_areas_custom",
        this.INIT_PARAM = "init_param",
        this.INIT_PARTS_VISIBLE = "init_parts_visible",
        this.VALUE = "val",
        this.FILE = "file",
        this.json = {}
    }
    Object.defineProperty(i, "__esModule", {
        value: !0
    }),
    i.default = r,
    e(0),
    r.prototype.loadModelSetting = function(t, i) {
        this.json = window.modelJson,
        i()
    }
    ,
    r.prototype.getTextureFile = function(t) {
        return null == this.json[this.TEXTURES] || null == this.json[this.TEXTURES][t] ? null : this.json[this.TEXTURES][t]
    }
    ,
    r.prototype.getModelFile = function() {
        return this.json[this.MODEL]
    }
    ,
    r.prototype.getTextureNum = function() {
        return null == this.json[this.TEXTURES] ? 0 : this.json[this.TEXTURES].length
    }
    ,
    r.prototype.getHitAreaNum = function() {
        return null == this.json[this.HIT_AREAS] ? 0 : this.json[this.HIT_AREAS].length
    }
    ,
    r.prototype.getHitAreaID = function(t) {
        return null == this.json[this.HIT_AREAS] || null == this.json[this.HIT_AREAS][t] ? null : this.json[this.HIT_AREAS][t][this.ID]
    }
    ,
    r.prototype.getHitAreaName = function(t) {
        return null == this.json[this.HIT_AREAS] || null == this.json[this.HIT_AREAS][t] ? null : this.json[this.HIT_AREAS][t][this.NAME]
    }
    ,
    r.prototype.getPhysicsFile = function() {
        return this.json[this.PHYSICS]
    }
    ,
    r.prototype.getPoseFile = function() {
        return this.json[this.POSE]
    }
    ,
    r.prototype.getExpressionNum = function() {
        return null == this.json[this.EXPRESSIONS] ? 0 : this.json[this.EXPRESSIONS].length
    }
    ,
    r.prototype.getExpressionFile = function(t) {
        return null == this.json[this.EXPRESSIONS] ? null : this.json[this.EXPRESSIONS][t][this.FILE]
    }
    ,
    r.prototype.getExpressionName = function(t) {
        return null == this.json[this.EXPRESSIONS] ? null : this.json[this.EXPRESSIONS][t][this.NAME]
    }
    ,
    r.prototype.getLayout = function() {
        return this.json[this.LAYOUT]
    }
    ,
    r.prototype.getHitAreasCustom = function() {
        return this.json[this.HIT_AREAS_CUSTOM]
    }
    ,
    r.prototype.getInitParamNum = function() {
        return null == this.json[this.INIT_PARAM] ? 0 : this.json[this.INIT_PARAM].length
    }
    ,
    r.prototype.getMotionNum = function(t) {
        return null == this.json[this.MOTION_GROUPS] || null == this.json[this.MOTION_GROUPS][t] ? 0 : this.json[this.MOTION_GROUPS][t].length
    }
    ,
    r.prototype.getMotionFile = function(t, i) {
        return null == this.json[this.MOTION_GROUPS] || null == this.json[this.MOTION_GROUPS][t] || null == this.json[this.MOTION_GROUPS][t][i] ? null : this.json[this.MOTION_GROUPS][t][i][this.FILE]
    }
    ,
    r.prototype.getMotionSound = function(t, i) {
        return null == this.json[this.MOTION_GROUPS] || null == this.json[this.MOTION_GROUPS][t] || null == this.json[this.MOTION_GROUPS][t][i] || null == this.json[this.MOTION_GROUPS][t][i][this.SOUND] ? null : this.json[this.MOTION_GROUPS][t][i][this.SOUND]
    }
    ,
    r.prototype.getMotionFadeIn = function(t, i) {
        return null == this.json[this.MOTION_GROUPS] || null == this.json[this.MOTION_GROUPS][t] || null == this.json[this.MOTION_GROUPS][t][i] || null == this.json[this.MOTION_GROUPS][t][i][this.FADE_IN] ? 1e3 : this.json[this.MOTION_GROUPS][t][i][this.FADE_IN]
    }
    ,
    r.prototype.getMotionFadeOut = function(t, i) {
        return null == this.json[this.MOTION_GROUPS] || null == this.json[this.MOTION_GROUPS][t] || null == this.json[this.MOTION_GROUPS][t][i] || null == this.json[this.MOTION_GROUPS][t][i][this.FADE_OUT] ? 1e3 : this.json[this.MOTION_GROUPS][t][i][this.FADE_OUT]
    }
    ,
    r.prototype.getInitParamID = function(t) {
        return null == this.json[this.INIT_PARAM] || null == this.json[this.INIT_PARAM][t] ? null : this.json[this.INIT_PARAM][t][this.ID]
    }
    ,
    r.prototype.getInitParamValue = function(t) {
        return null == this.json[this.INIT_PARAM] || null == this.json[this.INIT_PARAM][t] ? NaN : this.json[this.INIT_PARAM][t][this.VALUE]
    }
    ,
    r.prototype.getInitPartsVisibleNum = function() {
        return null == this.json[this.INIT_PARTS_VISIBLE] ? 0 : this.json[this.INIT_PARTS_VISIBLE].length
    }
    ,
    r.prototype.getInitPartsVisibleID = function(t) {
        return null == this.json[this.INIT_PARTS_VISIBLE] || null == this.json[this.INIT_PARTS_VISIBLE][t] ? null : this.json[this.INIT_PARTS_VISIBLE][t][this.ID]
    }
    ,
    r.prototype.getInitPartsVisibleValue = function(t) {
        return null == this.json[this.INIT_PARTS_VISIBLE] || null == this.json[this.INIT_PARTS_VISIBLE][t] ? NaN : this.json[this.INIT_PARTS_VISIBLE][t][this.VALUE]
    }
}
]);
