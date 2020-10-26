!function(){metadata={systemName:"com.k2.example",displayName:"Example Broker",description:"An example broker that accesses JSONPlaceholder."},ondescribe=async function({configuration:t}){postSchema({objects:{gapsInDateRanges:{displayName:"Gaps in Date Ranges",description:"Finds gaps in a list of date ranges.",properties:{input:{displayName:"input",type:"string"},outputInDays:{displayName:"Output in Days",type:"number"},outputFormatted:{displayName:"Output Formatted",type:"string"}},methods:{inDays:{displayName:"In Days",type:"read",inputs:["input"],requiredParameters:["input"],outputs:["outputInDays","outputFormatted"]}}}}})},onexecute=async function({objectName:e,methodName:a,parameters:n,properties:s,configuration:o,schema:i}){switch(e){case"gapsInDateRanges":await async function(e,a,n){switch(e){case"inDays":await function(e){let a=function(t){let e=0;for(let a of t){let t=Math.abs(a.DateB.getTime()-a.DateA.getTime()),n=Math.ceil(t/864e5);e+=n-1}return e}(function(e){for(var a=[],n=1;n<e.length;n++){var s=e[n-1].DateB.getTime()/1e3,o=e[n].DateA.getTime()/1e3;s<o&&a.push(new t(new Date(1e3*(s+1)),new Date(1e3*(o-1))))}return a}(function(e){let a=[],n=e.split(",");for(let e of n){let n=e.split(";")[0],s=e.split(";")[1];a.push(new t(new Date(new Date(n).toDateString()),new Date(new Date(s).toDateString())))}return a.sort((t,e)=>t.DateA<e.DateA?-1:t.DateA>e.DateA?1:0)}(e.input.toString()))),n="No gaps were found.";1==a?n=a+" Day":a>1&&(n=a+" Days");postResult({outputInDays:a,outputFormatted:n})}(a);break;default:throw new Error("The method "+e+" is not supported.")}}(a,s);break;default:throw new Error("The object "+e+" is not supported.")}};class t{constructor(t,e){this.DateA=t,this.DateB=e}}}();
//# sourceMappingURL=index.js.map