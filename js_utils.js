function linspace(start,stop,nb){
    return Array.from({ length: nb }, (_, index) => start + (index / (nb - 1)) * (stop - start));
  }
  
  function arange(start,stop,step){
    return Array.from({ length: Math.ceil((stop - start) / step) }, (_, index) => start + index * step);
  }
  
  function formatNumber(number) {
    formats = {
        0:'',
        1:'k',
        2:'m',
        3:'G',
        4:'T',
        5:'P',
    }
    nums = number.toString().split('.')
    mag = formats[Math.floor((nums[0].length-1)/3)]
    bigDigit = Math.floor(nums[0].length%3)
  
    if ((mag=='')){
        x1 = nums[0]
        x2 = nums[1].slice(0,3-nums[0].length)
    }else{
        x1 = nums[0].slice(0,bigDigit)
        x2 = nums[0].slice(bigDigit,3)
    }
    if(bigDigit!=0){
        return x1+ '.' + x2 + mag
    }else{
      if (mag==''){
        return x1 + mag
      }else{
        return x2+mag
      }
    }
  }
  
  function divide_interval(nbs,s,maxi){
    p = (maxi-s)/nbs-s
    intervals = []
    for (k=0;k<nbs;k++){
      intervals.push([s + k *(s + p), s+ k *(s + p)+p])
    }
    return intervals
  }
  
  function download_json(obj,filename){
    const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    if (!filename){
      filename='obj.json'
    }
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
  
  function saturates(nb,mini,maxi){
    nb = Math.min(nb,maxi)
    return Math.max(nb,mini)
  }
  
  function save_my_request_parameters() {
    const blob = new Blob([JSON.stringify(build_request_parameters())], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gui_params.json';
    a.click();
    URL.revokeObjectURL(url);
  }
  
  function formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(2, '0').slice(0,1)
    return `${year}-${month}-${day} ${hours}h${minutes}:${seconds}.${milliseconds}`;
  }
  
  function empty_table(table){
    nbrows = table.rows.length
    for (let index=1;index<nbrows;index++){
      table.deleteRow(1)
    }
  }
  
  function quick_extraction(obj,idx,precision){
    return Object.keys(obj).reduce((result, key) => {
      value = obj[key][idx]
      if (!(value==null)){
        result[key] = value.toFixed(precision)
      }
      else{
        result[key] = "NaN"
      }
      return result
    },{});
  }
  
  
  function make_axes_std(shift){
    fig = document.getElementsByClassName('plotly')[0].parentElement
    fig.id = 'fig'
    fig_id = fig.id
    plotly_fig = document.getElementById(fig_id)
    // ax_col = GRID_BOX_COLOR
    gw = 2
    grid_color='#bdbdbd'
    ax_col = "black"
    fs = 12
    yaxes = Object.keys(plotly_fig.layout).filter(x=>x.includes('yaxis'))
    nb = yaxes.length
    k=0
    positions=[]
    for (yax_name of yaxes){
      lay = {}
      if (k%2==0){
        side = 'left'
        position = Math.floor(k/2)*shift
      }else {
        side ='right'
        position = 1-Math.floor(k/2)*shift
      }
      positions.push(position)
      k++
      lay[yax_name+'.side'] = side
      lay[yax_name+'.position'] = position
      // ax_col = fig.layout[yax_name].tickfont.color 
      lay[yax_name + '.' +'linecolor']= ax_col
      lay[yax_name + '.' +'linewidth']= 4
      lay[yax_name + '.' +'ticks']= 'outside'
      lay[yax_name + '.' +'tickfont.color']= ax_col
      lay[yax_name + '.' +'title.font.color']= ax_col
      lay[yax_name + '.' +'ticklen']= 8
      lay[yax_name + '.' +'font.color']= ax_col
      lay[yax_name + '.' +'tickwidth']=2
      lay[yax_name + '.' +'tickcolor']=ax_col
      lay[yax_name + '.' +'gridcolor']= grid_color
      lay[yax_name + '.' +'zeroline']= false
      lay[yax_name + '.' +'gridwidth']= gw
      lay[yax_name + '.' +'anchor'] ='free'
      Plotly.relayout(fig_id,lay)
    }
    d = [Math.floor((nb-1)/2)*shift,1-(Math.floor(nb/2)-1)*shift]
    Plotly.relayout(fig_id,{'xaxis.domain':d})
  }
  
  const customColors = [
    '#1f77b4', // Blue
    '#ff7f0e', // Orange
    '#2ca02c', // Green
    '#d62728', // Red
    '#9467bd', // Purple
    '#8c564b', // Brown
    '#e377c2', // Pink
    '#7f7f7f', // Gray
    '#bcbd22', // Lime
    '#17becf'  // Cyan
  ];
function quick_new_colors(){
    // Change the default colors using plotly.restyle
    Plotly.restyle('fig', {
        'marker.color': customColors,
        'line.color': customColors
    });
}
  
  