class ToggleSwitch extends HTMLElement{
    constructor(){
        super();

        var shadow = this.attachShadow({mode: 'open'});
        var style = document.createElement('style');

        style.innerHTML = '.switch { position: relative; display: inline-block; width: 60px; height: 34px; }';
        style.innerHTML += '.checkbox { opacity: 0; width: 0; height: 0; }';
        style.innerHTML += '.slider, .slider.checked {position: absolute;border-radius: 34px;cursor: pointer;top: 0;left: 0;right: 0;bottom: 0;background-color: #ccc;-webkit-transition: .4s;transition: .4s;}';
        style.innerHTML += '.slider:before,.slider.checked:before {position: absolute;content: "";height: 26px;width: 26px;border-radius: 50%;left: 4px;bottom: 4px;background-color: white;-webkit-transition: .4s;transition: .4s;}';
        style.innerHTML += '.slider.checked{background-color: #2196F3;}';
        style.innerHTML += '.slider.checked:before {-webkit-transform: translateX(26px);-ms-transform: translateX(26px);transform: translateX(26px);}';

        var wrapper = document.createElement('div');
        wrapper.setAttribute('class','switch');
        wrapper.setAttribute('part','switch');

        var checkbox = document.createElement('input');
        checkbox.setAttribute('type','checkbox');
        checkbox.setAttribute('class','checkbox');
        checkbox.setAttribute('part','checkbox');

        var slider = document.createElement('div');
        slider.setAttribute('class','slider');
        slider.setAttribute('part','slider');

        this.addEventListener('click',function(){
            checkbox.checked = !checkbox.checked;
            if(checkbox.checked){
                slider.setAttribute('part','slider-checked');
                slider.setAttribute('class','slider checked');
            } else {
                slider.setAttribute('part','slider');
                slider.setAttribute('class','slider');
            }
        });

        shadow.appendChild(wrapper);
        shadow.appendChild(style);
        wrapper.appendChild(checkbox);
        wrapper.appendChild(slider);
    }
}

class CustomSelect extends HTMLElement{
    constructor(){
        super();

        var shadow = this.attachShadow({mode: 'open'});
        var style = document.createElement('style');

        var scrollBg = "#404040";
        var scrollThumbBg = "#909090";
        if(this.getAttribute('scroll-bg')) scrollBg = this.getAttribute('scroll-bg');
        if(this.getAttribute('scroll-thumb-bg')) scrollThumbBg = this.getAttribute('scroll-thumb-bg');

        style.innerHTML = '.wrapper{width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;flex-direction: column;background-color: #ccc;border-radius: 6px;position: relative;}';
        style.innerHTML += '.wrapper .text-input{width: 100%;height: 96%;padding-right: 2.5%; padding-left: 2.5%;font-family: "Poppins", sans-serif;font-size: 16px;background-color: transparent;border: none;outline: none;transition: all .4s ease;}';
        style.innerHTML += '.wrapper .line-bg{position: absolute;bottom: 6%;height: 1.5px;width: 96%;display: flex;justify-content: center;align-items: center;background-color: #959595;}';
        style.innerHTML += '.wrapper .line-bg .line{background-color: #303030;width: 0%;height: 100%;transition: all .4s ease;}';
        style.innerHTML += '.wrapper .text-input:focus ~ .line-bg .line{width: 100%;}';
        style.innerHTML += '.wrapper .text-input:focus ~ .select-options{opacity: 1;transform: translateY(0);}';
        style.innerHTML += '.wrapper .select-option{width: 100%;transition: all .4s ease;height: 40px;display: flex;overflow:hidden;border-bottom: 2px solid #404040; justify-content: center; align-items: center; color: #fff;}';
        style.innerHTML += '.wrapper .select-option:last-child{border: none;}';
        style.innerHTML += '.wrapper .select-option.hidden{height: 0;border-width: 0px; pointer-events: none; color: transparent;}';
        style.innerHTML += '.wrapper .select-options{height: fit-content;overflow:auto;max-height: 200px;width: 100%;opacity: 0;transform: translateY(50px);position: absolute;top: calc(100% + 10px);border-radius: 6px;background-color: #ccc;transition: all .4s ease;}';
        style.innerHTML += '.wrapper .select-options::-webkit-scrollbar{width: 8px;transition: all .4s ease;}';
        style.innerHTML += '.wrapper .select-options::-webkit-scrollbar-track{width: 10px; background-color: '+scrollBg+';border-bottom-right-radius: 6px;border-top-right-radius: 6px;}';
        style.innerHTML += '.wrapper .select-options::-webkit-scrollbar-thumb{border: 3px solid '+scrollBg+'; border-radius: 6px; background: '+scrollThumbBg+';}';

        var wrapper = document.createElement('div');
        wrapper.setAttribute('class','wrapper');
        wrapper.setAttribute('part','wrapper');

        var textInput = document.createElement('input');
        textInput.setAttribute('type','text');
        textInput.setAttribute('part','text-input');
        textInput.setAttribute('class','text-input');

        this.addEventListener('keyup',function(){
            for(var child of selectOptions.children){
                if(textInput.value.trim() == ""){
                    child.classList.remove('hidden');
                } else {
                    if(!child.innerHTML.toLowerCase().includes(textInput.value.toLowerCase())){
                        child.classList.add('hidden');
                    } else {
                        child.classList.remove('hidden');
                    }
                }
            }
        });

        var textBottomLine = document.createElement('div');
        textBottomLine.setAttribute('class','line-bg');
        textBottomLine.setAttribute('part','line-bg');

        var line = document.createElement('div');
        line.setAttribute('class','line');
        line.setAttribute('part','line');

        var selectOptions = document.createElement('div');
        selectOptions.setAttribute('part','select-options');
        selectOptions.setAttribute('class','select-options');

        for(var child of this.children){
            var option = document.createElement('div');
            option.setAttribute('class','select-option');
            option.setAttribute('part','select-option');
            option.innerHTML = child.innerHTML;
            selectOptions.appendChild(option);
            option.addEventListener('click',function(){
                textInput.value = this.innerHTML;
                for(var child of selectOptions.children){
                    if(textInput.value.trim() == ""){
                        child.classList.remove('hidden');
                    } else {
                        if(!child.innerHTML.toLowerCase().includes(textInput.value.toLowerCase())){
                            child.classList.add('hidden');
                        } else {
                            child.classList.remove('hidden');
                        }
                    }
                }
            });
        }

        shadow.appendChild(wrapper);
        shadow.appendChild(style);
        wrapper.appendChild(textInput);
        wrapper.appendChild(textBottomLine);
        wrapper.appendChild(selectOptions);
        textBottomLine.appendChild(line);
        
        // ToDo: add selected class to selected element and check in search if element is already selected 
    }
}

class CustomRange extends HTMLElement{
    constructor(){
        super();

        var shadow = this.attachShadow({mode: 'open'});
        var style = document.createElement('style');
        
        var min = 0;
        var max = 100;
        var value = 0;
        var thumbColor = '#202020';
        var thumbHoverColor = '#000';
        var type = "default";

        if(this.getAttribute('min')) min = this.getAttribute('min');
        if(this.getAttribute('max')) max = this.getAttribute('max');
        if(this.getAttribute('value')) value = this.getAttribute('value');
        if(this.getAttribute('thumb-color')) thumbColor = this.getAttribute('thumb-color');
        if(this.getAttribute('thumb-hover-color')) thumbHoverColor = this.getAttribute('thumb-hover-color');
        if(this.getAttribute('type')) type = this.getAttribute('type');

        console.log("Range-Type: ",type);

        var sliderAdjust = 0;
        if(type === "indicator") sliderAdjust = 50;

        this.style.display = "flex";
        this.style.justifyContent = "center";
        this.style.alignItems = "center";
        style.innerHTML = '.slider {-webkit-appearance: none;position: relative;width: calc(100% - '+sliderAdjust+'px);height: 15px; border-radius: 6px; background: #909090;outline: none;opacity: 1;-webkit-transition: .4s;transition: all .4s;}';
        style.innerHTML += '.slider::-webkit-slider-thumb {-webkit-appearance: none;position: relative;transition: all .4s ease; appearance: none; border-radius: 50%;width: 25px;height: 25px;background: '+thumbColor+';cursor: pointer;}';
        style.innerHTML += '.slider::-webkit-slider-thumb:hover{background-color: '+thumbHoverColor+';}';
        style.innerHTML += '.slider::-moz-range-thumb {width: 25px;height: 25px;background: #04AA6D;cursor: pointer;}';
        if(type === "indicator") style.innerHTML += '.indicator {width: 50px; display: flex; justify-content: center; align-items: center; border-radius: 6px; margin-left: 5%;height: 25px;background: '+thumbColor+';color:white;cursor: pointer;}';

        var slider = document.createElement('input');
        slider.setAttribute('type','range');
        slider.setAttribute('part','slider');
        slider.setAttribute('class','slider');
        slider.setAttribute('min',min);
        slider.setAttribute('max',max);
        slider.setAttribute('value',value);

        var indicator = document.createElement('div');
        indicator.setAttribute('part','indicator');
        indicator.setAttribute('class','indicator');
        indicator.innerHTML = value + "%";

        slider.addEventListener('input',function(){
            indicator.innerHTML = this.value+'%';
        });

        shadow.appendChild(style);
        shadow.appendChild(slider);
        if(type === "indicator") shadow.appendChild(indicator);
    }
}

class CustomTextField extends HTMLElement{
    constructor(){
        super();

        var shadow = this.attachShadow({mode: 'open'});
        var style = document.createElement('style');

        var type = "text";
        if(this.getAttribute('type')) type = this.getAttribute('type');

        style.innerHTML = '.wrapper{width: calc(100%);height: calc(100%);display: flex;justify-content: center;align-items: center;flex-direction: column;background-color: #ccc;border-radius: 6px;position: relative;}';
        style.innerHTML += '.wrapper .text-input{width: 100%;height: 96%;padding-left: 2.5%; padding-right: 2.5%;font-family: "Poppins", sans-serif;font-size: 16px;background-color: transparent;border: none;outline: none;transition: all .4s ease;}';
        style.innerHTML += '.wrapper .line-bg{position: absolute;bottom: 6%;height: 1.5px;width: 96%;display: flex;justify-content: center;align-items: center;background-color: #959595;}';
        style.innerHTML += '.wrapper .line-bg .line{background-color: #303030;width: 0%;height: 100%;transition: all .4s ease;}';
        style.innerHTML += '.wrapper .text-input:focus ~ .line-bg .line{width: 100%;}';
        style.innerHTML += '.hint{color: #505050; opacity: .8; transition: all .4s ease; z-index: 10; position: absolute; will-change:transform; top: 0; bottom: 0; margin: auto; left: 2.5%; pointer-events: none; height: fit-content; height: -moz-fit-content;}';

        var wrapper = document.createElement('div');
        wrapper.setAttribute('class','wrapper');
        wrapper.setAttribute('part','wrapper');

        var textInput = document.createElement('input');
        textInput.setAttribute('type',type);
        textInput.setAttribute('part','text-input');
        textInput.setAttribute('class','text-input');
        if(this.getAttribute('name')) textInput.setAttribute('name',this.getAttribute('name'));

        this.addEventListener('keyup',function(){
            if(textInput.value.trim() === ""){
                hint.style.opacity="1";
                hint.style.transform = "translateX(0px)";
            } else {
                hint.style.opacity="0";
                hint.style.transform = "translateX(50px)";
            }
        });

        var textBottomLine = document.createElement('div');
        textBottomLine.setAttribute('class','line-bg');
        textBottomLine.setAttribute('part','line-bg');

        var hint = document.createElement('span');
        hint.setAttribute('class','hint');
        hint.setAttribute('part','hint');
        hint.innerHTML = this.getAttribute('hint');

        var line = document.createElement('div');
        line.setAttribute('class','line');
        line.setAttribute('part','line');

        shadow.appendChild(wrapper);
        shadow.appendChild(style);
        wrapper.appendChild(textInput);
        wrapper.appendChild(textBottomLine);
        wrapper.appendChild(hint);
        textBottomLine.appendChild(line);
    }
}

class DropZone extends HTMLElement{
    constructor(){
        super();

        var shadow = this.attachShadow({mode: 'open'});
        var style = document.createElement('style');

        var iconAttr = '<i class="bx bxs-file-blank"></i>';
        var textAttr = 'Drag and Drop your files here...';
        if(this.getAttribute('icon')) iconAttr = this.getAttribute('icon');
        if(this.getAttribute('text')) textAttr = this.getAttribute('text');
        style.innerHTML = '.drop-border{width: calc(100% - 20px);transition: all .4s ease;height: calc(100% - 20px);border-radius: 8px;border: 4.5px dotted white;display: flex;justify-content: center;align-items: center;flex-direction: column;}';
        style.innerHTML += '.drop-border .icon{color: white;transition: all .4s ease;font-size: 38px;margin-bottom: 5px;}';
        style.innerHTML += '.drop-border .text{color: #EEE;transition: all .4s ease;font-size: 14px;max-width: 80%;text-align: center;}';
        style.innerHTML += '.file-input{position: absolute;inset: 0;margin: 0;opacity: 0;width: 100%; height: 100%;}';

        this.style.marginBottom = '20px';
        this.style.position = 'relative';
        this.style.width = '80%';
        this.style.height = '200px';
        this.style.backgroundColor = 'rgba(0,0,0,.7)';
        this.style.borderRadius = '8px';
        this.style.display = 'flex';
        this.style.justifyContent = 'center';
        this.style.alignItems = 'center';
        this.style.transition = 'all .4s ease';
        this.ondragover = this.ondragenter = function(event){
            event.preventDefault();
            this.classList.add('dragging');
            return false;
        };
        this.ondragleave = function(event){
            event.preventDefault();
            this.classList.remove('dragging');
            return false;
        };
        this.ondrop = function(event){
            event.preventDefault();
            this.classList.add('picked');
            input.files = event.dataTransfer.files;
            text.innerHTML = `${input.files.length} Files dropped`;
            var filesDroppedEvent = new CustomEvent('filesdropped',{
                detail: {
                    files: input.files,
                },
                bubbles: false,
                composed: true,
                cancelable: true
            });
            this.dispatchEvent(filesDroppedEvent);
            return false;
        };

        var input = document.createElement('input');
        input.setAttribute('part','file-input');
        input.setAttribute('class','file-input');
        input.setAttribute('type','file');
        input.setAttribute('multiple','multiple');

        input.addEventListener('change',(e) => {
            this.classList.add('picked');
            text.innerHTML = `${input.files.length} Files dropped`;
            var filesDroppedEvent = new CustomEvent('filesdropped',{
                detail: {
                    files: input.files,
                },
                bubbles: false,
                composed: true,
                cancelable: true
            });
            this.dispatchEvent(filesDroppedEvent);
            return false;
        });

        var dropBorder = document.createElement('div');
        dropBorder.setAttribute('part','drop-border');
        dropBorder.setAttribute('class','drop-border');

        var icon = document.createElement('span');
        icon.setAttribute('part','icon');
        icon.setAttribute('class','icon');
        icon.innerHTML = iconAttr;

        var text = document.createElement('span');
        text.setAttribute('part','text');
        text.setAttribute('class','text');
        text.innerHTML = textAttr;

        var sheet = document.createElement('link');
        sheet.setAttribute('rel','stylesheet');
        sheet.setAttribute('type','text/css');
        sheet.setAttribute('href','https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css');

        shadow.appendChild(style);
        shadow.appendChild(sheet);
        shadow.appendChild(input);
        shadow.appendChild(dropBorder);
        dropBorder.appendChild(icon);
        dropBorder.appendChild(text);
    }
}

class CustomButton extends HTMLElement{
    constructor(){
        super();

        var shadow = this.attachShadow({mode: 'open'});
        var style = document.createElement('style');
        var type = "default";
        if(this.getAttribute('type')) type = this.getAttribute('type');

        if(type === "raised"){
            style.innerHTML = '.shadow {background: #303030;border-radius: 12px;font-family: "Poppins",sans-serif;transition: all .2s cubic-bezier(.3, .7, .4, 1);border: none;padding: 0;cursor: pointer;width:100%;height:calc(100%);outline-offset: 4px;}';
            style.innerHTML += '.front {display: block;display: flex;will-change: transform;justify-content:center;transition: all .2s cubic-bezier(.3, .7, .4, 1);align-items:center;border-radius: 12px;height:100%;font-size: 1.25rem;background: #707070;color: white;transform: translateY(-3px);}';
            style.innerHTML += '.shadow:active .front {transform: translateY(-2px) !important;}';
            style.innerHTML += '.shadow:hover .front {transform: translateY(-6px);}';
        } else {
            style.innerHTML = '.shadow {background: #303030;border-radius: 12px;font-family: "Poppins",sans-serif;transition: all .2s cubic-bezier(.3, .7, .4, 1);border: none;padding: 0;cursor: pointer;width:100%;height:calc(100%);outline-offset: 4px;}';
        }

        var button = document.createElement('button');
        button.setAttribute('type','button');
        button.setAttribute('class','shadow');
        button.setAttribute('part','shadow');
        if(type !== "raised"){button.innerHTML = this.innerHTML;}
        
        if(type === "raised"){
            var front = document.createElement('span');
            front.setAttribute('class','front');
            front.setAttribute('part','front');
            front.innerHTML = this.innerHTML;
            button.appendChild(front);
            
            this.setInnerHTML = (newContent) => {
                front.innerHTML = newContent;
            };
        } else {
            this.setInnerHTML = (newContent) => {
                button.innerHTML = newContent;
            };
        }

        var sheet = document.createElement('link');
        sheet.setAttribute('rel','stylesheet');
        sheet.setAttribute('type','text/css');
        sheet.setAttribute('href','https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css');

        shadow.appendChild(sheet);
        shadow.appendChild(button);
        shadow.appendChild(style);
    }
}

customElements.define('toggle-switch',ToggleSwitch);
customElements.define('custom-select',CustomSelect);
customElements.define('custom-range',CustomRange);
customElements.define('custom-textfield',CustomTextField);
customElements.define('custom-button',CustomButton);
customElements.define('drop-zone',DropZone);