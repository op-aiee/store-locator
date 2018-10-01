function t(t){return t&&"object"==typeof t&&"default"in t?t.default:t}var e=t(require("event-emitter")),i=t(require("google-maps"));function o(){this.emitter=new e,this.actions={},this.filters={},this.previousRequest={},this.addAction("Bus/getPreviousRequest",this.getPreviousRequest,this)}o.prototype.addAction=function(t,e,i){this.actions[t]={ctx:i,fn:e}},o.prototype.removeAction=function(t){delete this.actions[t]},o.prototype.on=function(){this.emitter.on.apply(this.emitter,arguments)},o.prototype.off=function(){this.emitter.off.apply(this.emitter,arguments)},o.prototype.emit=function(){this.emitter.emit.apply(this.emitter,arguments)},o.prototype.applyFilter=function(t,e){var i=this.filters[t];return i&&i.fn&&i.fn.bind?i.fn(e):e},o.prototype.addFilter=function(t,e,i){void 0===i&&(i=!1),this.filters[t]={ctx:i,fn:e}},o.prototype.destroy=function(){this.emitter=null},o.prototype.getPreviousRequest=function(t,e){Object.assign(t,this.previousRequest),e(t)};var n={lookup:function(t,e){e({locations:[]})},settings:{key:"",lang:"en",region:"US",center:{lat:40.7190658,lng:-73.9969894},zoom:15,styles:{},disableDefaultUI:!0,zoomControl:!0,gestureHandling:"cooperative",icon:function(t){return"//image.png"},iconSize:function(t,e){return 1.5*e},paginate:!0,pageSize:50,mobilePageSize:5,mobileBreakpoint:1e3},elements:{map:".js-map",sidebar:".js-sidebar",form:".js-form",pagination:".js-pagination",nextPage:".js-next",prevPage:".js-prev",filter:".js-filter",redo:".js-redo",geolocation:".js-geolocation",geolocationFeedback:".js-geolocation-feedback"},templates:{sidebar:function(t){return"<li>"+t.name+"</li>"},marker:function(t){return"<div>"+t.name+"</div>"},empty:function(){return"<p>No Results Found</p>"}}};function s(){}function a(t,e,i){var o=t.lookup;void 0===e&&(e=[]),this.bus=i,this.lookup=o,this.createQueue(e)()}a.prototype.createQueue=function(t,e){var i=this;return void 0===e&&(e={}),t.length?((t=t.filter(function(t){return i.bus.actions[t]})).push(function(){i.lookup(e,function(t){i.endQueue(e,t)})}),t.reverse().reduce(function(t,o){return i.bus.actions[o].fn.bind(i.bus.actions[o].ctx,e,t)})):(this.lookup(e,function(t){i.endQueue(e,t)}),s)},a.prototype.endQueue=function(t,e){this.bus.previousRequest=Object.assign({},t),this.bus.emit("response",t,Object.assign({locations:[]},e))};var r=function(t){return t.classList.add("is-visible")},h=function(t){return t.classList.remove("is-visible")},u=function(t,e){return t.classList.contains(e)},p=function(t){return t.preventDefault()},c=function(t,e,i){return void 0===e&&(e=document),void 0===i&&(i=!1),i?[].slice.call(e.querySelectorAll(t)):e.querySelector(t)},l=function(t,e,i,o){return t.addEventListener||(e="on"+e),(t.addEventListener||t.attachEvent).call(t,e,i,o),i},g=function(t,e,i,o){return t.removeEventListener||(e="on"+e),(t.removeEventListener||t.detachEvent).call(t,e,i,o),i};function d(t,e){var o=t.settings,n=t.elements,s=t.templates;this.bus=e,this.settings=o,this.elements=n,this.templates=s,this.markers=[],this.google={},this.map=c(n.map),this.redo=c(n.redo),this.updateMap=this.updateMap.bind(this),this.focusOnMarker=this.focusOnMarker.bind(this),this.updateIcons=this.updateIcons.bind(this),this.showCenterButton=this.showCenterButton.bind(this),this.onRedo=this.onRedo.bind(this),e.on("response",this.updateMap),e.on("focus-on-marker",this.focusOnMarker),e.on("zoom-changed",this.updateIcons),e.on("dragend",this.showCenterButton),e.addAction("Map/Geocode",this.geocode,this),e.addAction("Map/getCenter",this.getCenter,this),e.addAction("Map/hideCenterButton",this.hideCenterButton,this),this.redo&&l(this.redo,"click",this.onRedo),i.LIBRARIES=["geometry","places"],i.KEY=o.key,i.LANGUAGE=o.lang,i.REGION=o.region,i.load(this.googleHasLoaded.bind(this))}function m(t,e){var i=t.elements;this.bus=e,this.form=c(i.form),this.onSubmit=this.onSubmit.bind(this),this.form&&(l(this.form,"submit",this.onSubmit),e.addAction("Form/validate",this.validate,this),e.addAction("Form/getValues",this.getValues,this),e.on("response",this.updateAddress.bind(this)))}function f(t,e){var i=this,o=t.elements,n=t.templates;this.bus=e,this.templates=n,this.sidebar=c(o.sidebar),this.filters=c(o.filter,document,!0)||[],this.geolocation=c(o.geolocation,document,!0)||[],this.geolocationFeedback=c(o.geolocationFeedback,document,!0)||[],this.onGeolocationClick=this.onGeolocationClick.bind(this),this.onFilterChange=this.onFilterChange.bind(this),this.onResponse=this.onResponse.bind(this),this.sidebar&&(this.geolocation.length&&this.geolocation.map(function(t){l(t,"click",i.onGeolocationClick)}),this.filters.length&&this.filters.map(function(t){l(t,"change",i.onFilterChange)}),e.on("response",this.onResponse),e.addAction("Sidebar/getFilters",this.getFilters,this),e.addAction("Sidebar/geolocation",this.askForGeolocation,this))}function b(t,e){var i=t.elements,o=t.settings;this.bus=e,this.settings=o,this.elements=i,this.paginate=o.paginate,this.pagination=c(i.pagination),this.pagination&&(this.left=c(i.prevPage,this.pagination),this.right=c(i.nextPage,this.pagination)),this.page=0,this.onClick=this.onClick.bind(this),this.onResponse=this.onResponse.bind(this),this.pageSize=this.pageSize.bind(this),this.paginate&&this.pagination&&l(this.pagination,"click",this.onClick),this.paginate&&(e.on("response",this.onResponse),e.addAction("Pagination/pageSize",this.addPageSizeToRequest,this),e.addAction("Pagination/getCurrentPage",this.getCurrentPage,this))}function y(t){var e=this;void 0===t&&(t={});var i=t.elements;this.settings={lookup:t.lookup||n.lookup,settings:Object.assign({},n.settings,t.settings),elements:Object.assign({},n.elements,i)};var s=Object.assign({},n.templates,t.templates);Object.keys(s).map(function(t){s[t]=s[t].bind(e)}),this.settings.templates=s,this.bus=new o,this.map=new d(this.settings,this.bus),this.form=new m(this.settings,this.bus),this.sidebar=new f(this.settings,this.bus),this.pagination=new b(this.settings,this.bus),this.on("request",this.triggerRequest.bind(this))}d.prototype.googleHasLoaded=function(t){var e=this;this.google.core=t,this.google.geocoder=new t.maps.Geocoder;var i=this.settings;this.google.map=new t.maps.Map(this.map,{center:i.center,zoom:i.zoom,styles:i.styles,disableDefaultUI:i.disableDefaultUI,zoomControl:i.zoomControl,gestureHandling:i.gestureHandling}),this.google.map.addListener("dragend",function(){return e.bus.emit("dragend")}),this.google.map.addListener("zoom_changed",function(){return e.bus.emit("zoom-changed")})},d.prototype.onRedo=function(t){t&&p(t),t&&t.target&&h(t.target),this.bus.emit("request",this.bus.applyFilter("Map/onRedo/request",["Form/validate","Form/getValues","Map/hideCenterButton","Map/getCenter","Sidebar/getFilters","Pagination/pageSize","Pagination/getCurrentPage"]))},d.prototype.updateMap=function(t,e){var i={lat:Number(t.lat),lng:Number(t.lng)};this.resetCenter(i),this.removeMarkers(),this.addMarker(Object.assign({},i,{center:!0}),0,!1,!0),this.addMarkers(t,e)},d.prototype.resetCenter=function(t){this.google.map.setCenter(t)},d.prototype.removeMarkers=function(){this.markers.forEach(function(t){return t.marker.setMap(null)}),this.markers=[]},d.prototype.addMarkers=function(t,e){var i=this,o=e.locations;void 0===o&&(o=[]),o.length!==[]&&o.map(function(t,e){i.addMarker(t,e+1)})},d.prototype.addMarker=function(t,e,i,o){void 0===i&&(i=!1),void 0===o&&(o=!1);var n=this.settings.iconSize(t,this.google.map.getZoom());i=new this.google.core.maps.Marker({position:{lat:Number(t.lat),lng:Number(t.lng)},icon:{url:this.settings.icon(t),scaledSize:new this.google.core.maps.Size(n,n)},zIndex:e,map:this.google.map}),o?i.name="center":(i.html=this.createMarkerHTML(t),i.addListener("click",this.showModal.bind(this,i)),i.name=t.name),this.markers.push({location:t,marker:i})},d.prototype.showModal=function(t){this.InfoWindow||(this.InfoWindow=new this.google.core.maps.InfoWindow({map:this.google.map})),this.InfoWindow.setContent(t.html),this.InfoWindow.open(this.google.map,t)},d.prototype.createMarkerHTML=function(t){return this.templates.marker(t)},d.prototype.focusOnMarker=function(t){var e=this.markers.map(function(t){return t.marker})[t+1];this.resetCenter(e.getPosition()),this.showModal(e)},d.prototype.updateIcons=function(){var t=this;this.markers.forEach(function(e){var i=e.location,o=e.marker,n=t.settings.iconSize(i,t.google.map.getZoom());o.setIcon({url:t.settings.icon(i),scaledSize:new t.google.core.maps.Size(n,n)})})},d.prototype.showCenterButton=function(){this.redo&&r(this.redo)},d.prototype.geocode=function(t,e){var i={},o=!1;t.lat&&t.lng?i.location={lat:t.lat,lng:t.lng}:(i.address=t.address,o=!0),t.region&&(i.region=t.region),this.google.geocoder.geocode(i,function(i,n){if("OK"===n){var s=i[0]||{};t.address=s.formatted_address||t.address,o&&(t.lat=s.geometry.location.lat(),t.lng=s.geometry.location.lng()),e(t)}else console.error("geocode error")})},d.prototype.getCenter=function(t,e){var i=this.google.map.getCenter();Object.assign(t,{lat:i.lat(),lng:i.lng(),address:!1}),e(t)},d.prototype.hideCenterButton=function(t,e){h(this.redo),e(t)},d.prototype.destroy=function(){g(this.redo,"click",this.onRedo),i.release()},m.prototype.onSubmit=function(t){t&&p(t),this.bus.emit("request",this.bus.applyFilter("Form/onSubmit/request",["Form/validate","Form/getValues","Sidebar/getFilters","Pagination/pageSize","Pagination/getCurrentPage","Map/Geocode"]))},m.prototype.validate=function(t,e){e()},m.prototype.getValues=function(t,e){c("[name]",this.form,!0).map(function(e){e.value&&(t[e.getAttribute("name")]=e.value)}),e(t)},m.prototype.updateAddress=function(t,e){var i=c('[name="address"]',this.form);i&&(i.value=t.address)},m.prototype.destroy=function(){this.form&&g(this.form,"submit",this.onSubmit)},f.prototype.onGeolocationClick=function(t){t&&p(t),this.bus.emit("request",this.bus.applyFilter("Sidebar/onGeolocationClick/request",["Form/getValues","Pagination/pageSize","Pagination/getCurrentPage","Sidebar/geolocation","Sidebar/getFilters","Map/Geocode"]))},f.prototype.onFilterChange=function(t){t&&p(t),this.bus.emit("request",this.bus.applyFilter("Sidebar/onFilterChange/request",["Form/getValues","Sidebar/getFilters","Pagination/pageSize","Map/Geocode"]))},f.prototype.onResponse=function(t,e){var i;(i=this.sidebar)&&(i.innerHTML=""),this.addToSidebar(e)},f.prototype.addToSidebar=function(t){var e=this;if(!t.locations.length)return this.noResults();this.sidebar.scrollTop=0,t.locations.map(function(t,i){var o=document.createElement("div");l(o,"click",function(t){return e.showMarker(t,i)}),o.innerHTML=e.templates.sidebar(t),e.sidebar.appendChild(o)})},f.prototype.showMarker=function(t,e){t.target.getAttribute("href")||(t&&p(t),this.bus.emit("focus-on-marker",e,t))},f.prototype.noResults=function(){this.sidebar.innerHTML=this.templates.empty()},f.prototype.getFilters=function(t,e){var i=this.filters.reduce(function(t,e){var i=e.getAttribute("name");return e.checked?(t[i]||(t[i]=[]),t[e.getAttribute("name")].push(e.value),t):t},{});Object.keys(i).length?e(Object.assign(t,i)):e(t)},f.prototype.askForGeolocation=function(t,e){this.geolocation.length&&this.geolocation.forEach(function(t){t.style.display="none"}),this.geolocationFeedback.length&&this.geolocationFeedback.forEach(function(t){return r(t)}),navigator.geolocation.getCurrentPosition(function(i){e(Object.assign(t,{lat:i.coords.latitude,lng:i.coords.longitude}))})},f.prototype.destroy=function(){var t=this;this.geolocation.length&&this.geolocation.map(function(e){g(e,"click",t.onGeolocationClick)}),this.filters.length&&this.filters.map(function(e){g(e,"change",t.onFilterChange)})},b.prototype.onClick=function(t){t&&p(t),!1!==this.incrementPage(t)&&this.bus.emit("request",this.bus.applyFilter("Pagination/onClick/request",["Bus/getPreviousRequest","Pagination/pageSize","Pagination/getCurrentPage"]))},b.prototype.onResponse=function(t,e){this.updatePagination(e),this.updateDOM()},b.prototype.incrementPage=function(t){var e=t.target,i=this.elements.prevPage.replace(".",""),o=this.elements.nextPage.replace(".","");return!!u(e,"is-active")&&(u(e,i)?this.page--:!!u(t.target,o)&&this.page++)},b.prototype.updatePagination=function(t){this.pageCount=Number(t.pageCount),this.page=Number(t.page)},b.prototype.addPageSizeToRequest=function(t,e){Object.assign(t,{pageSize:this.pageSize()}),e(t)},b.prototype.pageSize=function(){var t=this.settings.pageSize;return window.innerWidth<this.settings.mobileBreakpoint&&this.settings.mobilePageSize&&(this.pageSize=this.settings.mobilePageSize),t},b.prototype.getCurrentPage=function(t,e){e((t.page=this.page,t))},b.prototype.updateDOM=function(){this.pagination&&this.pagination.classList.add("is-active"),this.left&&this.left.classList[this.hasPrevPage()?"add":"remove"]("is-active"),this.right&&this.right.classList[this.hasNextPage()?"add":"remove"]("is-active")},b.prototype.hasPrevPage=function(){return this.page>=1},b.prototype.hasNextPage=function(){return this.page+1<this.pageCount},b.prototype.destroy=function(){this.pagination&&g(this.pagination,"click",this.onClick)},y.prototype.triggerRequest=function(t){return new a(this.settings,t,this.bus)},y.prototype.on=function(){this.bus.on.apply(this.bus,arguments)},y.prototype.off=function(){this.bus.off.apply(this.bus,arguments)},y.prototype.addAction=function(){this.bus.addAction.apply(this.bus,arguments)},y.prototype.removeAction=function(){this.bus.removeAction.apply(this.bus,arguments)},y.prototype.destroy=function(){this.bus.destroy(),this.map.destroy(),this.form.destroy(),this.sidebar.destroy(),this.pagination.destroy(),this.bus=null,this.map=null,this.form=null,this.sidebar=null,this.pagination=null},module.exports=y;
//# sourceMappingURL=index.js.map
