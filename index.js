document.addEventListener("DOMContentLoaded", (event) => {
    const xValue = document.getElementById("xValue");
    const yValue = document.getElementById("yValue");
    const addBtn = document.getElementById("addBtn");
    const taskList = document.getElementById("taskList");
    let list = JSON.parse(localStorage.getItem("DB"))??[];
    
    console.log(JSON.parse(localStorage.getItem("DB")))
    
    function loadList(){
        if(list.length > 0){
            localStorage.setItem("DB", JSON.stringify(list));
        }
    
        taskList.innerHTML = "";
    
        for(let i = 0; i < list.length; i++){
            let task = null;
    
            task = `
                <div class="task" id="${i}">
                <input type="text" value="X: ${list[i].x} - Y: ${list[i].y}" readonly class="inputTaskItem"
                onchange="changed(this)">
                <button class="deleteBtn"><i class="bx bx-trash"></i></button>
                </div>
            `;
    
            taskList.innerHTML+= task;
        }
    }
    
    
        loadList();
   
    
    addBtn.addEventListener("click", (e)=>{
        e.preventDefault();
    
        if(xValue.value !== "" && yValue.value !== ""){
    
            list.push({x: xValue.value, y: yValue.value});
    
            loadList();
            renderGraph();
            xValue.value = "";
            yValue.value = "";
    
            e.stopPropagation();
        }
    
    })
    
    document.addEventListener("click", (e)=>{
        const targetElement = e.target;
    
        if(targetElement.classList.contains("bx-trash")){
            list.splice(targetElement.parentElement.id, 1);
    
            if(list.length === 0){
                localStorage.clear();
            }
    
            loadList();
            renderGraph();
        }
    
        if(targetElement.classList.contains("inputTaskItem")){
            if(targetElement.readOnly){
                if(list[targetElement.parentElement.id].finished){list[targetElement.parentElement.id].finished = false}
                else {list[targetElement.parentElement.id].finished = true}
    
                localStorage.setItem("DB", JSON.stringify(list));
    
                targetElement.classList.toggle("finish");
                targetElement.classList.toggle("lthr");
            }
        }
    })
    
    
    
    function changed(val){
        list[val.parentElement.id].x = val.value;
        list[val.parentElement.id].y = val.value;
    }
    
    function renderGraph(){
      var x = new Array(), y = new Array();
    
      x = list.map((item) => item.x)
      y = list.map((item) => item.y)
    
      var trace1 = {
        x: x,
        y: y,
        mode: 'markers',
        name: 'points',
        marker: {
          color: 'rgb(102,0,0)',
          size: 5,
          opacity: 0.9
        },
        type: 'scatter'
      };
      var trace2 = {
        x: x,
        y: y,
        name: 'density',
        ncontours: 5,
        colorscale: 'Greens',
        reversescale: true,
        showscale: false,
        type: 'histogram2dcontour',
        opacity: 0.3
      };
    
    
      var data = [trace1, trace2];
      var layout = {
        showlegend: false,
        autosize: false,
        width: window.innerWidth < 600 ? 320 : 1000,
        height: window.innerWidth < 600 ? 320 : 1000,
        margin: {t: 50},
        hovermode: 'closest',
        bargap: 0,
        xaxis: {
          showgrid: true,
          zeroline: true,
          fixedrange: true,
          range: [-15,15],
          nticks: 60,
        },
        yaxis: {
          showgrid: true,
          fixedrange: true,
          zeroline: true,
          fixedrange: true,
          range: [-15,15],
          nticks: 60,
        },
        xaxis2: {
          //domain: [0.85, 1],
          showgrid: false,
          zeroline: false
        },
        yaxis2: {
          //domain: [0.85, 1],
          showgrid: false,
          zeroline: false
        },
        images: [{
              name: 'watermark_1',
              source: "https://media-hosting.imagekit.io/cbf3cc77f83449a2/T64.png?Expires=1838910749&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=p6irBWpJO-pHU7L-e3D7BQ~F9EwENIOxKyupOxvDXq0~fLKqGkesgagGCMf2rNNMYLoMuXo-Mx2-fJ5zvxrTbNIwXkRua5kJiqP2ueE-LNuNpraPFNFQQwvTs7HtFS2GfzUfm7OwKWRlhfPw3DC4J5FTwB~7GOexAQRabjK08-FYrtq0Nhdl08gHCRCv6gQWNP6aqgq5HgnyYzHSBvR5Xxrh9-1Xbi~aK2Yp0Ger-haHOiee83EDPZ3hSNbVhpogLys~GorJw8x2AsPrdFguL2H4efLQIX-enartoJjn-d4xIGHxDR3FEAfxqdERSR7GuT8r2EfirFnufktcJPPJzA__",
              xref: "paper",
              yref: "paper",
              x: 0.433,
              y: 0.7,
              sizex: 0.13,
              sizey: 0.8,
              opacity: 0.6,
              layer: "below"
            }
         ]
      };
      Plotly.newPlot('myDiv', data, layout);
    }
    
    renderGraph();
});
