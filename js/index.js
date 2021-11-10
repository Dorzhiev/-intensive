const disabledScroll = () => {

    const widthScroll = window.innerWidth - document.body.offsetWidth //ширина экрана - шинрина body 

    document.body.scrollPosition = window.scrollY//сохраним положение где мы находимся 

    document.body.style.cssText =`
        overflow: hidden;
        position: fixit; // свойства для айфона 
        top: -${document.body.scrollPosition}px; //сохроняет позицию после выхода из модалки
        left: 0;
        height: 100vh;
        width: 100vw;
        padding-right: ${widthScroll}px; //в body прописываем прописываем const widthScroll (разницу экрана и тело)
    `;
};
const enabledScroll = () => {
    document.body.style.cssText= 'position: relative';// для мобильных устройств, прописываем 'position: relative'
    window.scroll({top: document.body.scrollPosition});//вытаскиваем функцию из браузера и прописываем скролл сверху 
};

{
    const presentOrderBtn = document.querySelector('.present__order-btn');
    const pageOverlayModal = document.querySelector('.page__overlay_modal');
    const modalClose = document.querySelector('.modal__close');

    // pageOverlayModal.classList.add('page__overlay_modal_open');
    // pageOverlayModal.classList.remove('page__overlay_modal_open');

    const handlerModal = (openBtn, modal, openSelector, closeTrigger, sk = 'medium') => {

    let opacity = 0;

    const speed = {
    slow: 15,
    medium: 8,
    fast: 1
    };
    const openModal = () => {
        disabledScroll();
        modal.style.opacity = opacity;
        modal.classList.add(openSelector);
    
        const timer = setInterval(() => {
        opacity += 0.02;
        modal.style.opacity = opacity;
        if (opacity >= 1) clearInterval(timer);
        }, speed[sk]);
    };

    const closeModal = () => {
        enabledScroll();
        const timer = setInterval(() => {
        opacity -= 0.02;
        modal.style.opacity = opacity;
        if(opacity <= 0) {
        clearInterval(timer)
        modal.classList.remove(openSelector);
        }
      }, speed[sk]);
    };

    openBtn.addEventListener('click', openModal);

    closeTrigger.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if(event.target === modal) {
            closeModal()
        }
    })
    };
    handlerModal(
    presentOrderBtn, 
    pageOverlayModal, 
    'page__overlay_modal_open',
    modalClose,
    'medium'
    );
}

{
    const headerContactsBurger = document.querySelector('.header__contacts-burger');
    const headerContacts = document.querySelector('.header__contacts');

    const handlerBurger = (openBtn, menu, openSelector) => {
        openBtn.addEventListener('click', () =>  {
            if(menu.classList.contains(openSelector)) {
                menu.style.height = '';
                menu.classList.remove(openSelector);
            } else {
                menu.style.height = menu.scrollHeight + 'px';
                menu.classList.add(openSelector);
            }
        });
    };
    handlerBurger(headerContactsBurger , headerContacts,'header__contacts_open');
}
