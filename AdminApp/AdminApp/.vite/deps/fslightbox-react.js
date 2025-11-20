import {
  require_react
} from "./chunk-3VDXVL42.js";
import {
  __commonJS
} from "./chunk-5WRI5ZAA.js";

// node_modules/fslightbox-react/index.js
var require_fslightbox_react = __commonJS({
  "node_modules/fslightbox-react/index.js"(exports, module) {
    (() => {
      var e = { 913: (e2) => {
        window, e2.exports = (function(e3) {
          var t2 = {};
          function n2(o2) {
            if (t2[o2]) return t2[o2].exports;
            var i = t2[o2] = { i: o2, l: false, exports: {} };
            return e3[o2].call(i.exports, i, i.exports, n2), i.l = true, i.exports;
          }
          return n2.m = e3, n2.c = t2, n2.d = function(e4, t3, o2) {
            n2.o(e4, t3) || Object.defineProperty(e4, t3, { enumerable: true, get: o2 });
          }, n2.r = function(e4) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e4, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e4, "__esModule", { value: true });
          }, n2.t = function(e4, t3) {
            if (1 & t3 && (e4 = n2(e4)), 8 & t3) return e4;
            if (4 & t3 && "object" == typeof e4 && e4 && e4.__esModule) return e4;
            var o2 = /* @__PURE__ */ Object.create(null);
            if (n2.r(o2), Object.defineProperty(o2, "default", { enumerable: true, value: e4 }), 2 & t3 && "string" != typeof e4) for (var i in e4) n2.d(o2, i, (function(t4) {
              return e4[t4];
            }).bind(null, i));
            return o2;
          }, n2.n = function(e4) {
            var t3 = e4 && e4.__esModule ? function() {
              return e4.default;
            } : function() {
              return e4;
            };
            return n2.d(t3, "a", t3), t3;
          }, n2.o = function(e4, t3) {
            return Object.prototype.hasOwnProperty.call(e4, t3);
          }, n2.p = "", n2(n2.s = 0);
        })([function(e3, t2, n2) {
          "use strict";
          n2.r(t2);
          var o2, i = "fslightbox-", r = "".concat(i, "styles"), s = "".concat(i, "cursor-grabbing"), c = "".concat(i, "full-dimension"), a = "".concat(i, "flex-centered"), l = "".concat(i, "open"), u = "".concat(i, "transform-transition"), d = "".concat(i, "absoluted"), p = "".concat(i, "slide-btn"), f = "".concat(p, "-container"), h = "".concat(i, "fade-in"), m = "".concat(i, "fade-out"), g = h + "-strong", v = m + "-strong", b = "".concat(i, "opacity-"), x = "".concat(b, "1"), y = "".concat(i, "source");
          function w(e4) {
            return (w = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e5) {
              return typeof e5;
            } : function(e5) {
              return e5 && "function" == typeof Symbol && e5.constructor === Symbol && e5 !== Symbol.prototype ? "symbol" : typeof e5;
            })(e4);
          }
          function S(e4) {
            var t3, n3 = e4.props, o3 = 0, i2 = {};
            this.getSourceTypeFromLocalStorageByUrl = function(e5) {
              return t3[e5] ? t3[e5] : r2(e5);
            }, this.handleReceivedSourceTypeForUrl = function(e5, n4) {
              if (false === i2[n4] && (o3--, "invalid" !== e5 ? i2[n4] = e5 : delete i2[n4], 0 === o3)) {
                !(function(e6, t4) {
                  for (var n5 in t4) e6[n5] = t4[n5];
                })(t3, i2);
                try {
                  localStorage.setItem("fslightbox-types", JSON.stringify(t3));
                } catch (e6) {
                }
              }
            };
            var r2 = function(e5) {
              o3++, i2[e5] = false;
            };
            if (n3.disableLocalStorage) this.getSourceTypeFromLocalStorageByUrl = function() {
            }, this.handleReceivedSourceTypeForUrl = function() {
            };
            else {
              try {
                t3 = JSON.parse(localStorage.getItem("fslightbox-types"));
              } catch (e5) {
              }
              t3 || (t3 = {}, this.getSourceTypeFromLocalStorageByUrl = r2);
            }
          }
          function L(e4, t3, n3, o3) {
            e4.data;
            var i2 = e4.elements.sources, r2 = n3 / o3, s2 = 0;
            this.adjustSize = function() {
              if ((s2 = e4.mw / r2) < e4.mh) return n3 < e4.mw && (s2 = o3), c2();
              s2 = o3 > e4.mh ? e4.mh : o3, c2();
            };
            var c2 = function() {
              i2[t3].style.width = s2 * r2 + "px", i2[t3].style.height = s2 + "px";
            };
          }
          function C(e4, t3) {
            var n3 = this, o3 = e4.collections.sourceSizers, i2 = e4.elements, r2 = i2.sourceAnimationWrappers, s2 = i2.sources, c2 = e4.isl, a2 = e4.props.onSourceLoad, l2 = e4.resolve;
            function u2(e5, n4) {
              o3[t3] = l2(L, [t3, e5, n4]), o3[t3].adjustSize();
            }
            this.b = function(e5, o4) {
              s2[t3].classList.add(x), n3.a(), u2(e5, o4), n3.b = u2;
            }, this.a = function() {
              c2[t3] = true, r2[t3].classList.add(g), r2[t3].removeChild(r2[t3].firstChild), a2 && a2(e4, s2[t3], t3);
            };
          }
          function E(e4, t3) {
            var n3, o3 = this, i2 = e4.elements.sources, r2 = e4.props, s2 = (0, e4.resolve)(C, [t3]);
            this.handleImageLoad = function(e5) {
              var t4 = e5.target, n4 = t4.naturalWidth, o4 = t4.naturalHeight;
              s2.b(n4, o4);
            }, this.handleVideoLoad = function(e5) {
              var t4 = e5.target, o4 = t4.videoWidth, i3 = t4.videoHeight;
              n3 = true, s2.b(o4, i3);
            }, this.handleNotMetaDatedVideoLoad = function() {
              n3 || o3.handleYoutubeLoad();
            }, this.handleYoutubeLoad = function(e5, t4) {
              e5 || (e5 = 1920, t4 = 1080), r2.maxYoutubeDimensions && (e5 = r2.maxYoutubeDimensions.width, t4 = r2.maxYoutubeDimensions.height), s2.b(e5, t4);
            }, this.handleCustomLoad = function() {
              var e5 = i2[t3], n4 = e5.offsetWidth, r3 = e5.offsetHeight;
              n4 && r3 ? s2.b(n4, r3) : setTimeout(o3.handleCustomLoad);
            };
          }
          function A(e4, t3, n3) {
            var o3 = e4.elements.sources, i2 = e4.props.customClasses, r2 = i2[t3] ? i2[t3] : "";
            o3[t3].className = n3 + " " + r2;
          }
          function F(e4, t3) {
            var n3 = e4.elements.sources, o3 = e4.props.customAttributes;
            for (var i2 in o3[t3]) n3[t3].setAttribute(i2, o3[t3][i2]);
          }
          function z(e4, t3) {
            var n3 = e4.collections.sourceLoadHandlers, o3 = e4.elements, i2 = o3.sources, r2 = o3.sourceAnimationWrappers, s2 = e4.props.sources;
            i2[t3] = document.createElement("img"), A(e4, t3, y), i2[t3].src = s2[t3], i2[t3].onload = n3[t3].handleImageLoad, F(e4, t3), r2[t3].appendChild(i2[t3]);
          }
          function I(e4, t3) {
            var n3 = e4.ap, o3 = e4.collections.sourceLoadHandlers, i2 = e4.elements, r2 = i2.sources, s2 = i2.sourceAnimationWrappers, c2 = e4.props, a2 = c2.sources, l2 = c2.videosPosters, u2 = document.createElement("video"), d2 = document.createElement("source");
            r2[t3] = u2, A(e4, t3, "".concat(y, " fslightboxv")), u2.src = a2[t3], u2.onloadedmetadata = function(e5) {
              return o3[t3].handleVideoLoad(e5);
            }, u2.controls = true, u2.autoplay = n3.i(t3), F(e4, t3), l2[t3] && (r2[t3].poster = l2[t3]), d2.src = a2[t3], u2.appendChild(d2), setTimeout(o3[t3].handleNotMetaDatedVideoLoad, 3e3), s2[t3].appendChild(r2[t3]);
          }
          function P(e4, t3) {
            var n3 = e4.ap, o3 = e4.collections.sourceLoadHandlers, r2 = e4.elements, s2 = r2.sources, c2 = r2.sourceAnimationWrappers, a2 = e4.props.sources[t3], l2 = a2.split("?")[1], u2 = document.createElement("iframe");
            s2[t3] = u2, A(e4, t3, "".concat(y, " ").concat(i, "youtube-iframe")), u2.src = "https://www.youtube.com/embed/".concat(a2.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)[2], "?").concat(l2 || "").concat(n3.i(t3) ? "&mute=1&autoplay=1" : "", "&enablejsapi=1"), u2.allowFullscreen = true, F(e4, t3), c2[t3].appendChild(u2), o3[t3].handleYoutubeLoad(parseInt(u2.width), parseInt(u2.height));
          }
          function T(e4, t3) {
            var n3 = e4.collections.sourceLoadHandlers, o3 = e4.elements, i2 = o3.sources, r2 = o3.sourceAnimationWrappers, s2 = e4.props.sources;
            i2[t3] = s2[t3], A(e4, t3, "".concat(i2[t3].className, " ").concat(y)), r2[t3].appendChild(i2[t3]), n3[t3].handleCustomLoad();
          }
          function N(e4, t3) {
            var n3 = e4.elements, o3 = n3.sources, r2 = n3.sourceAnimationWrappers;
            e4.props.sources, o3[t3] = document.createElement("div"), o3[t3].className = "".concat(i, "invalid-file-wrapper ").concat(a), o3[t3].innerHTML = "Invalid source", r2[t3].appendChild(o3[t3]), new C(e4, t3).a();
          }
          function R(e4) {
            var t3 = e4.collections, n3 = t3.sourceLoadHandlers, o3 = t3.sourcesRenderFunctions, i2 = e4.core.sourceDisplayFacade, r2 = e4.resolve;
            this.runActionsForSourceTypeAndIndex = function(t4, s2) {
              var c2;
              switch ("invalid" !== t4 && (n3[s2] = r2(E, [s2])), t4) {
                case "image":
                  c2 = z;
                  break;
                case "video":
                  c2 = I;
                  break;
                case "youtube":
                  c2 = P;
                  break;
                case "custom":
                  c2 = T;
                  break;
                default:
                  c2 = N;
              }
              o3[s2] = function() {
                return c2(e4, s2);
              }, i2.displaySourcesWhichShouldBeDisplayed();
            };
          }
          function k(e4, t3, n3) {
            var o3 = e4.props, i2 = o3.types, r2 = o3.type, s2 = o3.sources;
            this.getTypeSetByClientForIndex = function(e5) {
              var t4;
              return i2 && i2[e5] ? t4 = i2[e5] : r2 && (t4 = r2), t4;
            }, this.retrieveTypeWithXhrForIndex = function(e5) {
              !(function(e6, t4) {
                var n4 = document.createElement("a");
                n4.href = e6;
                var o4 = n4.hostname;
                if ("www.youtube.com" === o4 || "youtu.be" === o4) return t4("youtube");
                var i3 = new XMLHttpRequest();
                i3.onreadystatechange = function() {
                  if (4 !== i3.readyState) {
                    if (2 === i3.readyState) {
                      var e7, n5 = i3.getResponseHeader("content-type");
                      switch (n5.slice(0, n5.indexOf("/"))) {
                        case "image":
                          e7 = "image";
                          break;
                        case "video":
                          e7 = "video";
                          break;
                        default:
                          e7 = "invalid";
                      }
                      i3.onreadystatechange = null, i3.abort(), t4(e7);
                    }
                  } else t4("invalid");
                }, i3.open("GET", e6), i3.send();
              })(s2[e5], (function(o4) {
                t3.handleReceivedSourceTypeForUrl(o4, s2[e5]), n3.runActionsForSourceTypeAndIndex(o4, e5);
              }));
            };
          }
          function M(e4, t3) {
            var n3 = e4.core.stageManager, o3 = e4.elements, i2 = o3.smw, r2 = o3.sourceWrappersContainer, s2 = e4.props, l2 = 0, p2 = document.createElement("div");
            function f2(e5) {
              p2.style.transform = "translateX(".concat(e5 + l2, "px)"), l2 = 0;
            }
            function h2() {
              return (1 + s2.slideDistance) * innerWidth;
            }
            p2.className = "".concat(d, " ").concat(c, " ").concat(a), p2.s = function() {
              p2.style.display = "flex";
            }, p2.h = function() {
              p2.style.display = "none";
            }, p2.a = function() {
              p2.classList.add(u);
            }, p2.d = function() {
              p2.classList.remove(u);
            }, p2.n = function() {
              p2.style.removeProperty("transform");
            }, p2.v = function(e5) {
              return l2 = e5, p2;
            }, p2.ne = function() {
              f2(-h2());
            }, p2.z = function() {
              f2(0);
            }, p2.p = function() {
              f2(h2());
            }, n3.i(t3) || p2.h(), i2[t3] = p2, r2.appendChild(p2), (function(e5, t4) {
              var n4 = e5.elements, o4 = n4.smw, i3 = n4.sourceAnimationWrappers, r3 = document.createElement("div"), s3 = document.createElement("div");
              s3.className = "fslightboxl";
              for (var c2 = 0; c2 < 3; c2++) {
                var a2 = document.createElement("div");
                s3.appendChild(a2);
              }
              r3.appendChild(s3), o4[t4].appendChild(r3), i3[t4] = r3;
            })(e4, t3);
          }
          function O(e4, t3, n3) {
            var o3 = document.createElementNS("http://www.w3.org/2000/svg", "svg"), r2 = "".concat(i, "svg");
            o3.setAttributeNS(null, "class", "".concat(r2)), o3.setAttributeNS(null, "viewBox", t3);
            var s2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
            return s2.setAttributeNS(null, "class", "".concat(r2, "p")), s2.setAttributeNS(null, "d", n3), o3.appendChild(s2), e4.appendChild(o3), o3;
          }
          function H(e4, t3) {
            var n3 = document.createElement("button");
            return n3.className = "fslightboxb ".concat(i, "toolbar-button ").concat(a), n3.title = t3, e4.appendChild(n3), n3;
          }
          function W(e4) {
            var t3 = e4.props.sources, n3 = e4.elements.container, o3 = document.createElement("div");
            o3.className = "".concat(i, "nav"), n3.appendChild(o3), (function(e5, t4) {
              var n4 = document.createElement("div");
              n4.className = "".concat(i, "toolbar"), t4.appendChild(n4), (function(e6, t5) {
                if (!e6.hfs) {
                  var n5 = "M4.5 11H3v4h4v-1.5H4.5V11zM3 7h1.5V4.5H7V3H3v4zm10.5 6.5H11V15h4v-4h-1.5v2.5zM11 3v1.5h2.5V7H15V3h-4z", o4 = H(t5);
                  o4.title = "Enter fullscreen";
                  var r2 = O(o4, "0 0 18 18", n5);
                  e6.fso = function() {
                    e6.ifs = 1, o4.title = "Exit fullscreen", r2.classList.add("".concat(i, "fsx")), r2.setAttributeNS(null, "viewBox", "0 0 950 1024"), r2.firstChild.setAttributeNS(null, "d", "M682 342h128v84h-212v-212h84v128zM598 810v-212h212v84h-128v128h-84zM342 342v-128h84v212h-212v-84h128zM214 682v-84h212v212h-84v-128h-128z");
                  }, e6.fsx = function() {
                    e6.ifs = 0, o4.title = "Enter fullscreen", r2.classList.remove("".concat(i, "fsx")), r2.setAttributeNS(null, "viewBox", "0 0 18 18"), r2.firstChild.setAttributeNS(null, "d", n5);
                  }, o4.onclick = e6.fs.t;
                }
              })(e5, n4), (function(e6, t5) {
                var n5 = H(t5, "Close");
                n5.onclick = e6.core.lightboxCloser.closeLightbox, O(n5, "0 0 24 24", "M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z");
              })(e5, n4);
            })(e4, o3), t3.length > 1 && (function(e5, t4) {
              var n4 = e5.props.sources, o4 = (e5.stageIndexes, document.createElement("div")), i2 = document.createElement("span"), r2 = document.createElement("span"), s2 = document.createElement("span");
              o4.className = "fslightboxsn", e5.sn = function(e6) {
                return i2.innerHTML = e6;
              }, r2.className = "fslightboxsl", s2.innerHTML = n4.length, o4.appendChild(i2), o4.appendChild(r2), o4.appendChild(s2), t4.appendChild(o4);
            })(e4, o3);
          }
          function D(e4, t3, n3, o3) {
            var i2 = e4.elements.container, r2 = n3.charAt(0).toUpperCase() + n3.slice(1), s2 = document.createElement("div");
            s2.className = "".concat(f, " ").concat(f, "-").concat(n3), s2.title = "".concat(r2, " slide"), s2.onclick = t3, (function(e5, t4) {
              var n4 = document.createElement("button");
              n4.className = "fslightboxb ".concat(p, " ").concat(a), O(n4, "0 0 20 20", t4), e5.appendChild(n4);
            })(s2, o3), i2.appendChild(s2);
          }
          function j(e4) {
            var t3 = e4.core, n3 = t3.lightboxCloser, o3 = t3.slideChangeFacade, i2 = e4.fs;
            this.listener = function(e5) {
              switch (e5.key) {
                case "Escape":
                  n3.closeLightbox();
                  break;
                case "ArrowLeft":
                  o3.changeToPrevious();
                  break;
                case "ArrowRight":
                  o3.changeToNext();
                  break;
                case "F11":
                  e5.preventDefault(), i2.t();
              }
            };
          }
          function X(e4) {
            var t3 = e4.elements, n3 = e4.sourcePointerProps, o3 = e4.stageIndexes;
            function i2(e5, o4) {
              t3.smw[e5].v(n3.swipedX)[o4]();
            }
            this.runActionsForEvent = function(e5) {
              var r2, c2, a2;
              t3.container.contains(t3.slideSwipingHoverer) || t3.container.appendChild(t3.slideSwipingHoverer), r2 = t3.container, c2 = s, (a2 = r2.classList).contains(c2) || a2.add(c2), n3.swipedX = e5.screenX - n3.downScreenX;
              var l2 = o3.previous, u2 = o3.next;
              i2(o3.current, "z"), void 0 !== l2 && n3.swipedX > 0 ? i2(l2, "ne") : void 0 !== u2 && n3.swipedX < 0 && i2(u2, "p");
            };
          }
          function q(e4) {
            var t3 = e4.dss, n3 = e4.props.sources, o3 = e4.resolve, i2 = e4.sourcePointerProps, r2 = o3(X);
            1 === n3.length || t3 ? this.listener = function() {
              i2.swipedX = 1;
            } : this.listener = function(e5) {
              i2.isPointering && r2.runActionsForEvent(e5);
            };
          }
          function B(e4) {
            var t3 = e4.core.slideIndexChanger, n3 = e4.elements.smw, o3 = e4.stageIndexes, i2 = e4.sws;
            function r2(e5) {
              var t4 = n3[o3.current];
              t4.a(), t4[e5]();
            }
            function s2(e5, t4) {
              void 0 !== e5 && (n3[e5].s(), n3[e5][t4]());
            }
            this.runPositiveSwipedXActions = function() {
              var e5 = o3.previous;
              if (void 0 === e5) r2("z");
              else {
                r2("p");
                var n4 = o3.next;
                t3.changeTo(e5);
                var c2 = o3.previous;
                i2.d(c2), i2.b(n4), r2("z"), s2(c2, "ne");
              }
            }, this.runNegativeSwipedXActions = function() {
              var e5 = o3.next;
              if (void 0 === e5) r2("z");
              else {
                r2("ne");
                var n4 = o3.previous;
                t3.changeTo(e5);
                var c2 = o3.next;
                i2.d(c2), i2.b(n4), r2("z"), s2(c2, "p");
              }
            };
          }
          function V(e4, t3) {
            e4.contains(t3) && e4.removeChild(t3);
          }
          function _(e4) {
            var t3 = e4.core.lightboxCloser, n3 = e4.dss, o3 = e4.elements, i2 = e4.props, r2 = e4.resolve, c2 = e4.sourcePointerProps, a2 = r2(B);
            this.runNoSwipeActions = function() {
              V(o3.container, o3.slideSwipingHoverer), c2.isSourceDownEventTarget || i2.disableBackgroundClose || t3.closeLightbox(), c2.isPointering = false;
            }, this.runActions = function() {
              n3 || (c2.swipedX > 0 ? a2.runPositiveSwipedXActions() : a2.runNegativeSwipedXActions()), V(o3.container, o3.slideSwipingHoverer), o3.container.classList.remove(s), c2.isPointering = false;
            };
          }
          function U(e4) {
            var t3 = e4.resolve, n3 = e4.sourcePointerProps, o3 = t3(_);
            this.listener = function() {
              n3.isPointering && (n3.swipedX ? o3.runActions() : o3.runNoSwipeActions());
            };
          }
          function Y(e4) {
            var t3 = this, n3 = e4.core, o3 = n3.globalEventsController, i2 = n3.scrollbarRecompensor, r2 = (e4.data, e4.e), s2 = e4.elements, c2 = e4.fs, a2 = e4.props, u2 = e4.sourcePointerProps;
            this.runActions = function() {
              t3.i = 1, s2.container.classList.add(v), o3.removeListeners(), a2.exitFullscreenOnClose && e4.ifs && c2.x(), setTimeout((function() {
                t3.i = 0, u2.isPointering = false, s2.container.classList.remove(v), document.documentElement.classList.remove(l), i2.removeRecompense(), document.body.removeChild(s2.container), r2("onClose");
              }), 270);
            };
          }
          function J(e4, t3) {
            var n3 = e4.classList;
            n3.contains(t3) && n3.remove(t3);
          }
          function G(e4) {
            var t3, n3, o3, i2, r2, s2, c2, a2, l2;
            !(function(e5) {
              var t4 = e5.ap, n4 = e5.elements.sources, o4 = e5.props, i3 = o4.autoplay, r3 = o4.autoplays;
              function s3(e6, o5) {
                if ("play" != o5 || t4.i(e6)) {
                  var i4 = n4[e6];
                  if (i4) {
                    var r4 = i4.tagName;
                    if ("VIDEO" == r4) i4[o5]();
                    else if ("IFRAME" == r4) {
                      var s4 = i4.contentWindow;
                      s4 && s4.postMessage('{"event":"command","func":"'.concat(o5, 'Video","args":""}'), "*");
                    }
                  }
                }
              }
              t4.i = function(e6) {
                return r3[e6] || i3 && 0 != r3[e6];
              }, t4.p = function(e6) {
                s3(e6, "play");
              }, t4.c = function(e6, t5) {
                s3(e6, "pause"), s3(t5, "play");
              };
            })(e4), (function(e5) {
              e5.data;
              var t4 = e5.fs, n4 = ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"], o4 = document.documentElement, i3 = o4.requestFullscreen;
              function r3(e6) {
                for (var t5 = 0; t5 < n4.length; t5++) document[e6](n4[t5], s3);
              }
              function s3() {
                document.fullscreenElement || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement ? e5.fso() : e5.fsx();
              }
              t4.i = function() {
                if (i3 || (i3 = o4.mozRequestFullScreen), i3 || (i3 = o4.webkitRequestFullscreen), i3 || (i3 = o4.msRequestFullscreen), !i3) return e5.hfs = 1, t4.o = function() {
                }, t4.x = function() {
                }, t4.t = function() {
                }, t4.l = function() {
                }, void (t4.q = function() {
                });
                t4.o = function() {
                  e5.fso();
                  var t5 = document.documentElement;
                  t5.requestFullscreen ? t5.requestFullscreen() : t5.mozRequestFullScreen ? t5.mozRequestFullScreen() : t5.webkitRequestFullscreen ? t5.webkitRequestFullscreen() : t5.msRequestFullscreen && t5.msRequestFullscreen();
                }, t4.x = function() {
                  e5.fsx(), document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.msExitFullscreen && document.msExitFullscreen();
                }, t4.t = function() {
                  e5.ifs ? t4.x() : t4.o();
                }, t4.l = function() {
                  r3("addEventListener");
                }, t4.q = function() {
                  r3("removeEventListener");
                };
              };
            })(e4), o3 = (n3 = (t3 = e4).core).globalEventsController, i2 = n3.windowResizeActioner, r2 = t3.fs, s2 = t3.resolve, c2 = s2(j), a2 = s2(q), l2 = s2(U), o3.attachListeners = function() {
              document.addEventListener("pointermove", a2.listener), document.addEventListener("pointerup", l2.listener), addEventListener("resize", i2.runActions), document.addEventListener("keydown", c2.listener), r2.l();
            }, o3.removeListeners = function() {
              document.removeEventListener("pointermove", a2.listener), document.removeEventListener("pointerup", l2.listener), removeEventListener("resize", i2.runActions), document.removeEventListener("keydown", c2.listener), r2.q();
            }, (function(e5) {
              var t4 = e5.core.lightboxCloser, n4 = (0, e5.resolve)(Y);
              t4.closeLightbox = function() {
                n4.isLightboxFadingOut || n4.runActions();
              };
            })(e4), (function(e5) {
              var t4 = e5.data, n4 = e5.core.scrollbarRecompensor;
              function o4() {
                document.body.offsetHeight > innerHeight && (document.body.style.marginRight = t4.scrollbarWidth + "px");
              }
              n4.addRecompense = function() {
                "complete" === document.readyState ? o4() : addEventListener("load", (function() {
                  o4(), n4.addRecompense = o4;
                }));
              }, n4.removeRecompense = function() {
                document.body.style.removeProperty("margin-right");
              };
            })(e4), (function(e5) {
              var t4 = e5.core, n4 = t4.slideChangeFacade, o4 = t4.slideIndexChanger, i3 = t4.stageManager;
              e5.props.sources.length > 1 ? (n4.changeToPrevious = function() {
                o4.jumpTo(i3.getPreviousSlideIndex());
              }, n4.changeToNext = function() {
                o4.jumpTo(i3.getNextSlideIndex());
              }) : (n4.changeToPrevious = function() {
              }, n4.changeToNext = function() {
              });
            })(e4), (function(e5) {
              var t4 = e5.ap, n4 = (e5.componentsServices, e5.core), o4 = n4.slideIndexChanger, i3 = n4.sourceDisplayFacade, r3 = n4.stageManager, s3 = e5.elements, c3 = s3.smw, a3 = s3.sourceAnimationWrappers, l3 = e5.isl, u2 = e5.stageIndexes, d2 = e5.sws;
              o4.changeTo = function(n5) {
                t4.c(u2.current, n5), u2.current = n5, r3.updateStageIndexes(), e5.sn(n5 + 1), i3.displaySourcesWhichShouldBeDisplayed();
              }, o4.jumpTo = function(e6) {
                var t5 = u2.previous, n5 = u2.current, i4 = u2.next, s4 = l3[n5], p2 = l3[e6];
                o4.changeTo(e6);
                for (var f2 = 0; f2 < c3.length; f2++) c3[f2].d();
                d2.d(n5), d2.c(), requestAnimationFrame((function() {
                  requestAnimationFrame((function() {
                    var e7 = u2.previous, o5 = u2.next;
                    function f3() {
                      r3.i(n5) ? n5 === u2.previous ? c3[n5].ne() : n5 === u2.next && c3[n5].p() : (c3[n5].h(), c3[n5].n());
                    }
                    s4 && a3[n5].classList.add(m), p2 && a3[u2.current].classList.add(h), d2.a(), void 0 !== e7 && e7 !== n5 && c3[e7].ne(), c3[u2.current].n(), void 0 !== o5 && o5 !== n5 && c3[o5].p(), d2.b(t5), d2.b(i4), l3[n5] ? setTimeout(f3, 260) : f3();
                  }));
                }));
              };
            })(e4), (function(e5) {
              var t4 = e5.core.sourcesPointerDown, n4 = e5.elements, o4 = n4.smw, i3 = n4.sources, r3 = e5.sourcePointerProps, s3 = e5.stageIndexes;
              t4.listener = function(e6) {
                "VIDEO" !== e6.target.tagName && e6.preventDefault(), r3.isPointering = true, r3.downScreenX = e6.screenX, r3.swipedX = 0;
                var t5 = i3[s3.current];
                t5 && t5.contains(e6.target) ? r3.isSourceDownEventTarget = true : r3.isSourceDownEventTarget = false;
                for (var n5 = 0; n5 < o4.length; n5++) o4[n5].d();
              };
            })(e4), (function(e5) {
              var t4 = e5.collections.sourcesRenderFunctions, n4 = e5.core.sourceDisplayFacade, o4 = e5.loc, i3 = e5.stageIndexes;
              function r3(e6) {
                t4[e6] && (t4[e6](), delete t4[e6]);
              }
              n4.displaySourcesWhichShouldBeDisplayed = function() {
                if (o4) r3(i3.current);
                else for (var e6 in i3) r3(i3[e6]);
              };
            })(e4), (function(e5) {
              var t4 = e5.core.stageManager, n4 = e5.elements, o4 = n4.smw, i3 = n4.sourceAnimationWrappers, r3 = e5.isl, s3 = e5.stageIndexes, c3 = e5.sws;
              c3.a = function() {
                for (var e6 in s3) o4[s3[e6]].s();
              }, c3.b = function(e6) {
                void 0 === e6 || t4.i(e6) || (o4[e6].h(), o4[e6].n());
              }, c3.c = function() {
                for (var e6 in s3) c3.d(s3[e6]);
              }, c3.d = function(e6) {
                if (r3[e6]) {
                  var t5 = i3[e6];
                  J(t5, g), J(t5, h), J(t5, m);
                }
              };
            })(e4), (function(e5) {
              var t4 = e5.collections.sourceSizers, n4 = e5.core.windowResizeActioner, o4 = (e5.data, e5.elements.smw), i3 = e5.props.sourceMargin, r3 = e5.stageIndexes, s3 = 1 - 2 * i3;
              n4.runActions = function() {
                innerWidth > 992 ? e5.mw = s3 * innerWidth : e5.mw = innerWidth, e5.mh = s3 * innerHeight;
                for (var n5 = 0; n5 < o4.length; n5++) o4[n5].d(), t4[n5] && t4[n5].adjustSize();
                var i4 = r3.previous, c3 = r3.next;
                void 0 !== i4 && o4[i4].ne(), void 0 !== c3 && o4[c3].p();
              };
            })(e4);
          }
          function $(e4, t3, n3) {
            return ($ = (function() {
              if ("undefined" == typeof Reflect || !Reflect.construct) return false;
              if (Reflect.construct.sham) return false;
              if ("function" == typeof Proxy) return true;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {
                }))), true;
              } catch (e5) {
                return false;
              }
            })() ? Reflect.construct.bind() : function(e5, t4, n4) {
              var o3 = [null];
              o3.push.apply(o3, t4);
              var i2 = new (Function.bind.apply(e5, o3))();
              return n4 && K(i2, n4.prototype), i2;
            }).apply(null, arguments);
          }
          function K(e4, t3) {
            return (K = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e5, t4) {
              return e5.__proto__ = t4, e5;
            })(e4, t3);
          }
          function Q(e4, t3) {
            (null == t3 || t3 > e4.length) && (t3 = e4.length);
            for (var n3 = 0, o3 = new Array(t3); n3 < t3; n3++) o3[n3] = e4[n3];
            return o3;
          }
          "object" === ("undefined" == typeof document ? "undefined" : w(document)) && ((o2 = document.createElement("style")).className = r, o2.appendChild(document.createTextNode(".fslightbox-absoluted{position:absolute;top:0;left:0}.fslightbox-fade-in{animation:fslightbox-fade-in .3s cubic-bezier(0,0,.7,1)}.fslightbox-fade-out{animation:fslightbox-fade-out .3s ease}.fslightbox-fade-in-strong{animation:fslightbox-fade-in-strong .3s cubic-bezier(0,0,.7,1)}.fslightbox-fade-out-strong{animation:fslightbox-fade-out-strong .3s ease}@keyframes fslightbox-fade-in{from{opacity:.65}to{opacity:1}}@keyframes fslightbox-fade-out{from{opacity:.35}to{opacity:0}}@keyframes fslightbox-fade-in-strong{from{opacity:.3}to{opacity:1}}@keyframes fslightbox-fade-out-strong{from{opacity:1}to{opacity:0}}.fslightbox-cursor-grabbing{cursor:grabbing}.fslightbox-full-dimension{width:100%;height:100%}.fslightbox-open{overflow:hidden;height:100%}.fslightbox-flex-centered{display:flex;justify-content:center;align-items:center}.fslightbox-opacity-0{opacity:0!important}.fslightbox-opacity-1{opacity:1!important}.fslightbox-scrollbarfix{padding-right:17px}.fslightbox-transform-transition{transition:transform .3s}.fslightbox-container{font-family:Arial,sans-serif;position:fixed;top:0;left:0;background:linear-gradient(rgba(30,30,30,.9),#000 1810%);touch-action:pinch-zoom;z-index:1000000000;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}.fslightbox-container *{box-sizing:border-box}.fslightbox-svg{width:20px;height:20px}.fslightbox-svgp{transition:fill .15s ease;fill:#ddd}.fslightbox-nav{height:45px;width:100%;position:absolute;top:0;left:0}.fslightboxsn{z-index:0;display:flex;align-items:center;margin:14px 0 0 11px;font-size:15px;color:#d7d7d7}.fslightboxsn span{display:inline;vertical-align:middle}.fslightboxsl{display:inline-block!important;margin:0 5px;width:1px;height:12px;transform:rotate(15deg);background:white}.fslightbox-toolbar{position:absolute;z-index:3;right:0;top:0;height:100%;display:flex}.fslightbox-toolbar-button{width:45px;height:100%}.fslightbox-fsx{width:24px;height:24px}.fslightboxb{border:0;background:rgba(35,35,35,.65);cursor:pointer}.fslightboxb:focus{outline:0}.fslightboxb:focus .fslightbox-svgp{fill:#fff}.fslightboxb:hover .fslightbox-svgp{fill:#fff}.fslightbox-slide-btn-container{display:flex;align-items:center;padding:12px 12px 12px 6px;position:absolute;top:50%;cursor:pointer;z-index:3;transform:translateY(-50%)}.fslightbox-slide-btn-container-next{right:0;padding-left:12px;padding-right:3px}@media (min-width:476px){.fslightbox-slide-btn-container{padding:22px 22px 22px 6px}.fslightbox-slide-btn-container-next{padding-right:6px!important;padding-left:22px}}@media (min-width:768px){.fslightbox-slide-btn-container{padding:30px 30px 30px 6px}.fslightbox-slide-btn-container-next{padding-left:30px}.fslightbox-slide-btn{padding:10px}}.fslightbox-slide-btn-container:hover .fslightbox-svgp{fill:#fff}.fslightbox-slide-btn{padding:9px}.fslightbox-slide-btn-container-previous{left:0}@media (max-width:475.99px){.fslightbox-slide-btn-container-previous{padding-left:3px}}.fslightbox-down-event-detector{position:absolute;z-index:1}.fslightbox-slide-swiping-hoverer{z-index:4}.fslightbox-invalid-file-wrapper{font-size:22px;color:#eaebeb;margin:auto}.fslightboxv{object-fit:cover}.fslightbox-youtube-iframe{border:0}.fslightboxl{display:block;margin:auto;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:67px;height:67px}.fslightboxl div{box-sizing:border-box;display:block;position:absolute;width:54px;height:54px;margin:6px;border:5px solid;border-color:#999 transparent transparent transparent;border-radius:50%;animation:fslightboxl 1.2s cubic-bezier(.5,0,.5,1) infinite}.fslightboxl div:nth-child(1){animation-delay:-.45s}.fslightboxl div:nth-child(2){animation-delay:-.3s}.fslightboxl div:nth-child(3){animation-delay:-.15s}@keyframes fslightboxl{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}.fslightbox-source{position:relative;z-index:2;opacity:0}@media (min-width:1200px){.fslightboxsn{margin:15px 0 0 12px;font-size:16px;display:block}.fslightboxsl{margin:0 6px 1px 6px;height:14px}.fslightbox-slide-btn{padding:11px}.fslightbox-svg{width:22px;height:22px}.fslightbox-fsx{width:26px;height:26px}.fslightbox-fso{width:22px;height:22px}.fslightboxl div{width:60px;height:60px;border-width:6px;border-color:#999 transparent transparent transparent;border-radius:50%}}@media (min-width:1600px){.fslightbox-nav{height:50px}.fslightboxsn{display:flex;margin:19px 0 0 16px;font-size:20px}.fslightboxsl{margin:0 7px 1px 7px;height:16px;width:2px;background:#d7d7d7}.fslightbox-toolbar-button{width:50px}.fslightbox-slide-btn{padding:12px}.fslightbox-svg{width:24px;height:24px}.fslightbox-fsx{width:28px;height:28px}.fslightbox-fso{width:24px;height:24px}}")), document.head.appendChild(o2)), window.FsLightbox = function() {
            var e4 = this;
            this.props = { sources: [], customAttributes: [], customClasses: [], autoplays: [], types: [], videosPosters: [], exitFullscreenOnClose: 1, sourceMargin: 0.05, slideDistance: 0.3 }, this.data = { isFullscreenOpen: false, scrollbarWidth: 0 }, this.isl = [], this.sourcePointerProps = { downScreenX: null, isPointering: false, isSourceDownEventTarget: false, swipedX: 0 }, this.stageIndexes = {}, this.elements = { a: [], container: null, slideSwipingHoverer: null, smw: [], sourceWrappersContainer: null, sources: [], sourceAnimationWrappers: [] }, this.sn = function() {
            }, this.resolve = function(t3) {
              var n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
              return n3.unshift(e4), $(t3, (function(e5) {
                return (function(e6) {
                  if (Array.isArray(e6)) return Q(e6);
                })(e5) || (function(e6) {
                  if ("undefined" != typeof Symbol && null != e6[Symbol.iterator] || null != e6["@@iterator"]) return Array.from(e6);
                })(e5) || (function(e6, t4) {
                  if (e6) {
                    if ("string" == typeof e6) return Q(e6, t4);
                    var n4 = Object.prototype.toString.call(e6).slice(8, -1);
                    return "Object" === n4 && e6.constructor && (n4 = e6.constructor.name), "Map" === n4 || "Set" === n4 ? Array.from(e6) : "Arguments" === n4 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n4) ? Q(e6, t4) : void 0;
                  }
                })(e5) || (function() {
                  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                })();
              })(n3));
            }, this.collections = { sourceLoadHandlers: [], sourcesRenderFunctions: [], sourceSizers: [] }, this.core = { globalEventsController: {}, lightboxCloser: {}, lightboxUpdater: {}, scrollbarRecompensor: {}, slideChangeFacade: {}, slideIndexChanger: {}, sourcesPointerDown: {}, sourceDisplayFacade: {}, stageManager: {}, windowResizeActioner: {} }, this.ap = {}, this.fs = {}, this.sws = {}, this.e = function(t3) {
              e4.props[t3] && e4.props[t3](e4);
            }, (function(e5) {
              var t3 = e5.ap, n3 = (e5.componentsServices, e5.core), o3 = n3.globalEventsController, r2 = n3.scrollbarRecompensor, s2 = n3.sourceDisplayFacade, a2 = n3.stageManager, u2 = n3.windowResizeActioner, p2 = e5.data, f2 = e5.e, h2 = e5.elements, m2 = (e5.props, e5.stageIndexes), v2 = e5.sws, b2 = 0;
              function x2() {
                var t4, n4, o4 = e5.props, r3 = o4.autoplay, s3 = o4.autoplays;
                b2 = true, (function(e6) {
                  var t5 = e6.props, n5 = t5.autoplays;
                  e6.c = t5.sources.length;
                  for (var o5 = 0; o5 < e6.c; o5++) "false" === n5[o5] && (n5[o5] = 0), "" === n5[o5] && (n5[o5] = 1);
                  e6.dss = t5.disableSlideSwiping, e6.loc = t5.loadOnlyCurrentSource;
                })(e5), p2.scrollbarWidth = (function() {
                  var e6 = document.createElement("div"), t5 = e6.style, n5 = document.createElement("div");
                  t5.visibility = "hidden", t5.width = "100px", t5.msOverflowStyle = "scrollbar", t5.overflow = "scroll", n5.style.width = "100%", document.body.appendChild(e6);
                  var o5 = e6.offsetWidth;
                  e6.appendChild(n5);
                  var i2 = n5.offsetWidth;
                  return document.body.removeChild(e6), o5 - i2;
                })(), (r3 || s3.length > 0) && (e5.loc = 1), G(e5), e5.fs.i(), h2.container = document.createElement("div"), h2.container.className = "".concat(i, "container ").concat(c, " ").concat(g), h2.container.setAttribute("tabindex", "0"), (function(e6) {
                  var t5 = e6.elements;
                  t5.slideSwipingHoverer = document.createElement("div"), t5.slideSwipingHoverer.className = "".concat(i, "slide-swiping-hoverer ").concat(c, " ").concat(d);
                })(e5), W(e5), (function(e6) {
                  var t5 = e6.core.sourcesPointerDown, n5 = e6.elements, o5 = e6.props.sources, i2 = document.createElement("div");
                  i2.className = "".concat(d, " ").concat(c), n5.container.appendChild(i2), i2.addEventListener("pointerdown", t5.listener), n5.sourceWrappersContainer = i2;
                  for (var r4 = 0; r4 < o5.length; r4++) M(e6, r4);
                })(e5), e5.props.sources.length > 1 && (n4 = (t4 = e5).core.slideChangeFacade, D(t4, n4.changeToPrevious, "previous", "M18.271,9.212H3.615l4.184-4.184c0.306-0.306,0.306-0.801,0-1.107c-0.306-0.306-0.801-0.306-1.107,0L1.21,9.403C1.194,9.417,1.174,9.421,1.158,9.437c-0.181,0.181-0.242,0.425-0.209,0.66c0.005,0.038,0.012,0.071,0.022,0.109c0.028,0.098,0.075,0.188,0.142,0.271c0.021,0.026,0.021,0.061,0.045,0.085c0.015,0.016,0.034,0.02,0.05,0.033l5.484,5.483c0.306,0.307,0.801,0.307,1.107,0c0.306-0.305,0.306-0.801,0-1.105l-4.184-4.185h14.656c0.436,0,0.788-0.353,0.788-0.788S18.707,9.212,18.271,9.212z"), D(t4, n4.changeToNext, "next", "M1.729,9.212h14.656l-4.184-4.184c-0.307-0.306-0.307-0.801,0-1.107c0.305-0.306,0.801-0.306,1.106,0l5.481,5.482c0.018,0.014,0.037,0.019,0.053,0.034c0.181,0.181,0.242,0.425,0.209,0.66c-0.004,0.038-0.012,0.071-0.021,0.109c-0.028,0.098-0.075,0.188-0.143,0.271c-0.021,0.026-0.021,0.061-0.045,0.085c-0.015,0.016-0.034,0.02-0.051,0.033l-5.483,5.483c-0.306,0.307-0.802,0.307-1.106,0c-0.307-0.305-0.307-0.801,0-1.105l4.184-4.185H1.729c-0.436,0-0.788-0.353-0.788-0.788S1.293,9.212,1.729,9.212z")), (function(e6) {
                  for (var t5 = e6.props.sources, n5 = e6.resolve, o5 = n5(S), i2 = n5(R), r4 = n5(k, [o5, i2]), s4 = 0; s4 < t5.length; s4++) if ("string" == typeof t5[s4]) {
                    var c2 = r4.getTypeSetByClientForIndex(s4);
                    if (c2) i2.runActionsForSourceTypeAndIndex(c2, s4);
                    else {
                      var a3 = o5.getSourceTypeFromLocalStorageByUrl(t5[s4]);
                      a3 ? i2.runActionsForSourceTypeAndIndex(a3, s4) : r4.retrieveTypeWithXhrForIndex(s4);
                    }
                  } else i2.runActionsForSourceTypeAndIndex("custom", s4);
                })(e5), f2("onInit");
              }
              e5.open = function() {
                var n4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, i2 = m2.previous, c2 = m2.current, d2 = m2.next;
                m2.current = n4, b2 || (function(e6) {
                  var t4 = e6.stageIndexes, n5 = e6.core.stageManager, o4 = e6.props.sources.length - 1;
                  n5.getPreviousSlideIndex = function() {
                    return 0 === t4.current ? o4 : t4.current - 1;
                  }, n5.getNextSlideIndex = function() {
                    return t4.current === o4 ? 0 : t4.current + 1;
                  }, n5.updateStageIndexes = 0 === o4 ? function() {
                  } : 1 === o4 ? function() {
                    0 === t4.current ? (t4.next = 1, delete t4.previous) : (t4.previous = 0, delete t4.next);
                  } : function() {
                    t4.previous = n5.getPreviousSlideIndex(), t4.next = n5.getNextSlideIndex();
                  }, n5.i = o4 <= 2 ? function() {
                    return true;
                  } : function(e7) {
                    var n6 = t4.current;
                    if (0 === n6 && e7 === o4 || n6 === o4 && 0 === e7) return true;
                    var i3 = n6 - e7;
                    return -1 === i3 || 0 === i3 || 1 === i3;
                  };
                })(e5), a2.updateStageIndexes(), b2 ? (v2.c(), v2.a(), v2.b(i2), v2.b(c2), v2.b(d2), f2("onShow")) : x2(), s2.displaySourcesWhichShouldBeDisplayed(), e5.sn(n4 + 1), document.body.appendChild(h2.container), h2.container.focus(), document.documentElement.classList.add(l), r2.addRecompense(), o3.attachListeners(), u2.runActions(), h2.smw[n4].n(), t3.p(n4), f2("onOpen");
              };
            })(this), this.close = function() {
              return e4.core.lightboxCloser.closeLightbox();
            };
          };
        }]);
      } }, t = {};
      function n(o2) {
        var i = t[o2];
        if (void 0 !== i) return i.exports;
        var r = t[o2] = { exports: {} };
        return e[o2](r, r.exports, n), r.exports;
      }
      n.n = (e2) => {
        var t2 = e2 && e2.__esModule ? () => e2.default : () => e2;
        return n.d(t2, { a: t2 }), t2;
      }, n.d = (e2, t2) => {
        for (var o2 in t2) n.o(t2, o2) && !n.o(e2, o2) && Object.defineProperty(e2, o2, { enumerable: true, get: t2[o2] });
      }, n.o = (e2, t2) => Object.prototype.hasOwnProperty.call(e2, t2), n.r = (e2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
      };
      var o = {};
      (() => {
        "use strict";
        n.r(o), n.d(o, { default: () => s });
        const e2 = require_react();
        var t2 = n.n(e2);
        function i(e3) {
          return i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e4) {
            return typeof e4;
          } : function(e4) {
            return e4 && "function" == typeof Symbol && e4.constructor === Symbol && e4 !== Symbol.prototype ? "symbol" : typeof e4;
          }, i(e3);
        }
        var r = 0;
        function s(o2) {
          for (var i2 = (0, e2.useRef)(), s2 = [], c = (0, e2.useRef)(), a = (0, e2.useRef)(o2.toggler), l = 0; l < o2.sources.length; l++) s2[l] = (0, e2.useRef)();
          function u() {
            var e3 = o2.sourceIndex;
            void 0 === e3 && (e3 = o2.slide), e3 ? e3-- : e3 = 0, c.current.open(e3);
          }
          return t2().useInsertionEffect && t2().useInsertionEffect((function() {
            r || (n(913), r = 1);
          }), []), (0, e2.useEffect)((function(e3) {
            if (r || (n(913), r = 1), !c.current) {
              var t3 = new window.FsLightbox();
              return Object.assign(t3.props, o2), t3.props.sources = o2.sources.map((function(e4, t4) {
                return "string" == typeof e4 ? e4 : (i2.current.removeChild(s2[t4].current), s2[t4].current);
              })), t3.props.onSourceLoad = function(e4, t4, n2) {
                "string" != typeof o2.sources[n2] && (t4.firstChild.style.width = "100%", t4.firstChild.style.height = "100%"), o2.onSourceLoad && o2.onSourceLoad(e4, t4, n2);
              }, t3.props.maxYoutubeDimensions = o2.maxYoutubeVideoDimensions, c.current = t3, void (o2.openOnMount && u());
            }
            o2.toggler != a.current && (a.current = o2.toggler, u());
          }), [o2.toggler]), !c.current && t2().createElement("div", { ref: i2, style: { display: "none" } }, o2.sources.map((function(e3, n2) {
            return "string" != typeof e3 && t2().createElement("div", { ref: s2[n2], className: "fslightboxs", key: n2 }, e3);
          })));
        }
        "object" === ("undefined" == typeof window ? "undefined" : i(window)) && (n(913), r = 1);
      })(), module.exports = o;
    })();
  }
});
export default require_fslightbox_react();
//# sourceMappingURL=fslightbox-react.js.map
