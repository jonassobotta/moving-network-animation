!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.MovingNetworkAnimation=e():t.MovingNetworkAnimation=e()}(this,(()=>{return t={497:function(t,e){var n,i;function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function r(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){s(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function s(t,e,n){return(e=u(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function c(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,u(i.key),i)}}function h(t,e,n){return e&&c(t.prototype,e),n&&c(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function u(t){var e=function(t){if("object"!=f(t)||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var n=e.call(t,"string");if("object"!=f(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==f(e)?e:e+""}function f(t){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},f(t)}"undefined"!=typeof self&&self,void 0===(i="function"==typeof(n=function(){var t={nodeColor:"rgba(255,255,255)",edgeColor:"rgba(0,181,255)",maxNodes:250,minRadius:2,radiusVariance:2,minSpeed:.5,speedVariance:1,connectionRadius:150},e=function(){return h((function e(n,i){a(this,e),this.settings=r(r({},t),i),this.parentElement=n,this.init()}),[{key:"init",value:function(){var t=this;this.canvas=document.createElement("canvas"),this.canvas.width=this.parentElement.offsetWidth,this.canvas.height=this.parentElement.offsetHeight,this.parentElement.appendChild(this.canvas),this.context=this.canvas.getContext("2d"),this.nodes=Array.from({length:this.settings.maxNodes},(function(){return new n(t.canvas.width,t.canvas.height,t.settings)})),window.addEventListener("resize",this.resize.bind(this),!1),this.requestId=requestAnimationFrame(this.animate.bind(this))}},{key:"resize",value:function(){this.canvas.width=this.parentElement.offsetWidth,this.canvas.height=this.parentElement.offsetHeight}},{key:"animate",value:function(){var t=this;this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.nodes.forEach((function(e){e.update(t.canvas.width,t.canvas.height),e.draw(t.context)})),this.connectNodes(),this.requestId=requestAnimationFrame(this.animate.bind(this))}},{key:"connectNodes",value:function(){var t=this;this.nodes.forEach((function(e){t.nodes.forEach((function(n){if(e!==n){var i=e.distanceTo(n);if(i<t.settings.connectionRadius){t.context.beginPath(),t.context.moveTo(e.x,e.y),t.context.lineTo(n.x,n.y);var o=1-i/t.settings.connectionRadius;t.context.strokeStyle="rgba(".concat(t.settings.edgeColor.match(/\d+/g).join(","),",").concat(o,")"),t.context.lineWidth=.5,t.context.stroke()}}}))}))}},{key:"destroy",value:function(){cancelAnimationFrame(this.requestId),window.removeEventListener("resize",this.resize.bind(this)),this.parentElement.removeChild(this.canvas)}}])}(),n=function(){return h((function t(e,n,i){a(this,t),this.x=Math.random()*e,this.y=Math.random()*n,this.color=i.nodeColor,this.radius=i.minRadius+Math.random()*i.radiusVariance,this.speed=i.minSpeed+Math.random()*i.speedVariance,this.direction=2*Math.random()*Math.PI,this.velocity={x:Math.cos(this.direction)*this.speed,y:Math.sin(this.direction)*this.speed}}),[{key:"update",value:function(t,e){this.x+=this.velocity.x,this.y+=this.velocity.y,(this.x<=0||this.x>=t)&&(this.velocity.x*=-1),(this.y<=0||this.y>=e)&&(this.velocity.y*=-1)}},{key:"draw",value:function(t){t.fillStyle=this.color,t.beginPath(),t.arc(this.x,this.y,this.radius,0,2*Math.PI),t.fill()}},{key:"distanceTo",value:function(t){var e=this.x-t.x,n=this.y-t.y;return Math.sqrt(e*e+n*n)}}])}();return e})?n.apply(e,[]):n)||(t.exports=i)}},e={},function n(i){var o=e[i];if(void 0!==o)return o.exports;var r=e[i]={exports:{}};return t[i].call(r.exports,r,r.exports,n),r.exports}(497);var t,e}));