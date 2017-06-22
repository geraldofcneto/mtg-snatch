"use strict";angular.module("mtgSnatchApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ui.select","afkl.lazyImage","environment","angular-toArrayFilter"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/sets",{templateUrl:"views/sets.html",controller:"SetsCtrl",controllerAs:"sets"}).when("/cards",{templateUrl:"views/cards.html",controller:"CardsCtrl",controllerAs:"cards"}).otherwise({redirectTo:"/"})}]).config(["envServiceProvider",function(a){a.config({domains:{development:["localhost","dev.local"],c9:["mtg-snatch-io-geraldofcneto.c9users.io"],production:["geraldofcneto.github.io/mtg-snatch","mtg-snatch2.s3-website-us-east-1.amazonaws.com","mtg-snatch.herokuapp.com"]},vars:{development:{apiUrl:"//localhost:8888/",staticUrl:"//localhost/static",mtgio:"https://api.magicthegathering.io/v1/"},production:{apiUrl:"//mtg-collection-api.herokuapp.com/",mtgio:"https://api.magicthegathering.io/v1/"},c9:{apiUrl:"//mtg-collection-api.herokuapp.com/",mtgio:"https://api.magicthegathering.io/v1/"}}}),a.check()}]),angular.module("mtgSnatchApp").controller("MainCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("mtgSnatchApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("mtgSnatchApp").controller("SetsCtrl",["$scope","$http",function(a,b){b({method:"GET",url:"https://api.magicthegathering.io/v1/sets"}).then(function(b){console.log(b),a.loadedSets=b.data.sets})}]),angular.module("mtgSnatchApp").controller("CardsCtrl",["$scope","$http","envService",function(a,b,c){function d(){a.config.loadOnChange&&e()}function e(){b.get(s+"cards?"+m()).then(function(b){a.loadedCards=b.data.cards})}function f(){b.get(s+"sets").then(function(b){a.sets=b.data.sets})}function g(){b.get(s+"types").then(function(b){a.types=b.data.types})}function h(){b.get(s+"subtypes").then(function(b){a.subtypes=b.data.subtypes})}function i(){b.get(s+"formats").then(function(b){a.legalities=b.data.formats})}function j(){b.get(t+"color").then(function(b){a.colors=b.data})}function k(){b.get(t+"rarity").then(function(b){a.rarities=b.data})}function l(){b.get(t+"languages").then(function(b){a.languages=b.data})}function m(){return Object.keys(a.query).map(function(b){return a.query[b]&&a.query[b].length?b+"="+a.query[b]:""}).filter(function(a){return""!==a}).join("&")}function n(a){return null!==a.imageUrl&&void 0!==a.imageUrl&&""!==a.imageUrl}function o(b){var c=(a.collection.get(b)||0)+1;a.collection.set(b,c),a.mappedCards.get(b).have=c}function p(b){var c=a.collection.get(b)||0;c&&(a.collection.set(b,c-1),a.mappedCards.get(b).have=c-1)}function q(b){if(!a.query.language)return b.imageUrl;var c=r(b,a.query.language);return c?c.imageUrl:b.imageUrl}function r(a,b){return a.foreignNames.find(function(a){return a.language==b})}var s=c.read("mtgio"),t=c.read("apiUrl");a.onQueryChange=d,a.loadCards=e,a.hasImage=n,a.addToCollection=o,a.removeFromCollection=p,a.imageFromCard=q,a.query={name:"",text:"",flavor:"",set:"",type:"",subtypes:"",legality:"",colors:"",rarity:"",cmc:""},a.sets=[],a.types=[],a.subtypes=[],a.legalities=[],a.colors=[],a.rarities=[],a.languages=[],a.collection=new Map,a.config={loadOnChange:!0},f(),g(),h(),i(),j(),k(),l()}]),angular.module("mtgSnatchApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/cards.html",'<p> <label>Name</label> <input ng-change="onQueryChange()" ng-model="query.name" ng-model-options="{ debounce: 1000 }"> </p> <p> <label>CMC</label> <input ng-change="onQueryChange()" ng-model="query.cmc" ng-model-options="{ debounce: 1000 }"> </p> <p> <label>Text</label> <input ng-change="onQueryChange()" ng-model="query.text" ng-model-options="{ debounce: 1000 }"> </p> <p> <label>Flavor</label> <input ng-change="onQueryChange()" ng-model="query.flavor" ng-model-options="{ debounce: 1000 }"> </p> <ui-select multiple ng-model="query.set" theme="bootstrap" style="width: 300px" title="Choose card set" ng-change="onQueryChange()"> <ui-select-match placeholder="Select or search card set..."> [{{$item.code}}] {{$item.name}} {{$item.block? \'- \' + $item.block : \'\'}} </ui-select-match> <ui-select-choices repeat="set.code as set in sets | filter: $select.search"> [{{set.code}}] {{set.name}} {{set.block? \'- \' + set.block : \'\'}} </ui-select-choices> </ui-select> <ui-select multiple ng-model="query.colors" theme="bootstrap" style="width: 300px" title="Choose card colors" ng-change="onQueryChange()"> <ui-select-match placeholder="Select or search card colors...">{{$item.name}}</ui-select-match> <ui-select-choices repeat="color.name as color in colors | filter: $select.search"> {{color.name}} </ui-select-choices> </ui-select> <ui-select multiple ng-model="query.rarity" theme="bootstrap" style="width: 300px" title="Choose card rarity" ng-change="onQueryChange()"> <ui-select-match placeholder="Select or search card rarity...">{{$item}}</ui-select-match> <ui-select-choices repeat="rarity in rarities | filter: $select.search"> {{rarity}} </ui-select-choices> </ui-select> <ui-select multiple ng-model="query.type" theme="bootstrap" style="width: 300px" title="Choose card types" ng-change="onQueryChange()"> <ui-select-match placeholder="Select or search card types...">{{$item}}</ui-select-match> <ui-select-choices repeat="type in types | filter: $select.search"> {{type}} </ui-select-choices> </ui-select> <ui-select multiple ng-model="query.subtypes" theme="bootstrap" style="width: 300px" title="Choose card subtypes" ng-change="onQueryChange()"> <ui-select-match placeholder="Select or search card subtypes...">{{$item}}</ui-select-match> <ui-select-choices repeat="subtype in subtypes | filter: $select.search"> {{subtype}} </ui-select-choices> </ui-select> <ui-select multiple ng-model="query.legality" theme="bootstrap" style="width: 300px" title="Choose card legality" ng-change="onQueryChange()"> <ui-select-match placeholder="Select or search card legality...">{{$item}}</ui-select-match> <ui-select-choices repeat="legality in legalities | filter: $select.search"> {{legality}} </ui-select-choices> </ui-select> <ui-select ng-model="query.language" theme="bootstrap" style="width: 300px" title="Choose card prefered language" ng-change="onQueryChange()"> <ui-select-match placeholder="Select or search card prefered language...">{{$select.selected}}</ui-select-match> <ui-select-choices repeat="language in languages | filter: $select.search"> {{language}} </ui-select-choices> </ui-select> <label> <input type="checkbox" ng-model="config.loadOnChange">Run search on change </label> <div> <div ng-repeat="card in loadedCards | filter: hasImage | orderBy: order" class="card-image float-card"> <div class="collection-overlay"> <div class="badge collection-have"> Have {{card.have}} <span class="glyphicon glyphicon-minus" aria-hidden="true" ng-click="removeFromCollection(card.id)" ng-show="card.have"></span> <span class="glyphicon glyphicon-plus" aria-hidden="true" ng-click="addToCollection(card.id)"></span> </div> <div class="badge collection-want">Want</div> <!-- \n\t\t<div class="badge collection-trade">Trade</div> \n\t\t--> </div> <div afkl-lazy-image="{{imageFromCard(card)}}" class="afkl-lazy-wrapper afkl-img-ratio-1-1 own-classname" afkl-lazy-image-options="{imgAttrs: [{alt: &quot;{{card.name}}&quot;}]}"></div> </div> </div>'),a.put("views/main.html",'<div class="jumbotron"> <h1>\'Allo, \'Allo!</h1> <p class="lead"> <img src="images/yeoman.8cb970fb.png" alt="I\'m Yeoman"><br> Always a pleasure scaffolding your apps. </p> <p><a class="btn btn-lg btn-success" ng-href="#/">Splendid!<span class="glyphicon glyphicon-ok"></span></a></p> </div> <div class="row marketing"> <h4>HTML5 Boilerplate</h4> <p> HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites. </p> <h4>Angular</h4> <p> AngularJS is a toolset for building the framework most suited to your application development. </p> <h4>Karma</h4> <p>Spectacular Test Runner for JavaScript.</p> </div>'),a.put("views/sets.html","<p ng-repeat=\"set in loadedSets | filter:'expansion' | orderBy:'-releaseDate'\"> <a ng-href=\"#/cards/{{set.code}}\">{{set.code}} - {{set.name}}</a> </p>")}]);