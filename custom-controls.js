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

class MainContainer extends HTMLElement{
    constructor(){
        super();

        var shadow = this.attachShadow({mode: 'open'});
        var style = document.createElement('style');

        shadow.appendChild(style);
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
        if(this.getAttribute('scroll-thumb-color')) scrollThumbBg = this.getAttribute('scroll-thumb-color');

        style.innerHTML = '.wrapper{width: 300px;height: 40px;display: flex;justify-content: center;align-items: center;flex-direction: column;background-color: #ccc;border-radius: 6px;padding: 4px 8px 4px 8px;position: relative;}';
        style.innerHTML += '.wrapper .text-input{width: 100%;height: 96%;font-family: "Poppins", sans-serif;font-size: 16px;background-color: transparent;border: none;outline: none;transition: all .4s ease;}';
        style.innerHTML += '.wrapper .text-bottom-line{position: absolute;bottom: 6%;height: 1.5px;width: 96%;display: flex;justify-content: center;align-items: center;background-color: #959595;}';
        style.innerHTML += '.wrapper .text-bottom-line .line{background-color: #303030;width: 0%;height: 100%;transition: all .4s ease;}';
        style.innerHTML += '.wrapper .text-input:focus ~ .text-bottom-line .line{width: 100%;}';
        style.innerHTML += '.wrapper .text-input:focus ~ .select-options{opacity: 1;transform: translateY(0);}';
        style.innerHTML += '.wrapper .select-option{width: 100%;transition: all .4s ease;height: 40px;display: flex;overflow:hidden;border-bottom: 2px solid #404040; justify-content: center; align-items: center; color: #fff;}';
        style.innerHTML += '.wrapper .select-option:last-child{border: none;}';
        style.innerHTML += '.wrapper .select-option.hidden{height: 0;border-width: 0px; pointer-events: none; color: transparent;}';
        style.innerHTML += '.wrapper .select-options{height: fit-content;overflow:auto;max-height: 250px;width: 100%;opacity: 0;transform: translateY(50px);position: absolute;top: calc(100% + 10px);border-radius: 6px;background-color: #ccc;transition: all .4s ease;}';
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
                    $(child).removeClass('hidden');
                } else {
                    if(!child.innerHTML.toLowerCase().includes(textInput.value.toLowerCase())){
                        $(child).addClass('hidden');
                    } else {
                        $(child).removeClass('hidden');
                    }
                }
            }
        });

        var textBottomLine = document.createElement('div');
        textBottomLine.setAttribute('class','text-bottom-line');
        textBottomLine.setAttribute('part','text-bottom-line');

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
                        $(child).removeClass('hidden');
                    } else {
                        if(!child.innerHTML.toLowerCase().includes(textInput.value.toLowerCase())){
                            $(child).addClass('hidden');
                        } else {
                            $(child).removeClass('hidden');
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
        //hasChildNodes for children
    }
}

customElements.define('toggle-switch',ToggleSwitch);
customElements.define('custom-select',CustomSelect);
customElements.define('main-container',MainContainer,{extends: 'div'});