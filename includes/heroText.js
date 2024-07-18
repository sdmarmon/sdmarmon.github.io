document.addEventListener('alpine:init', () => {
    Alpine.data('heroText', () => ({
        shortIntro: 'Sylvain<br>Duhau-Marmon',
        longIntro: 'Hi! I am Sylvain <span class="whitespace-nowrap">Duhau-Marmon.<span>',
        shortCatchPhrase: "Cognitive Engineer, UX Specialist.",
        longCatchPhrase: 'Cognitive Engineer, UX Specialist.<br><span class="font-normal">Rigorous methods and reliable measures are key to designing beautiful interfaces and intuitive features.<span>',
        textOverflowMobile: false,
        textOverflowDesktop: false,
        checkOverflow() {
        if (this.textOverflowMobile !== true)
        {
            const mobileElement = document.getElementById('tabletText');
            const mobileOverflow = (mobileElement.scrollHeight > mobileElement.clientHeight || mobileElement.scrollWidth > mobileElement.clientWidth);
            this.textOverflowMobile = mobileOverflow;
        }
        if (this.textOverflowDesktop !== true){
            const desktopElement = document.getElementById('desktopText');
            const desktopOverflow = (desktopElement.scrollHeight > desktopElement.clientHeight || desktopElement.scrollWidth > desktopElement.clientWidth);
            this.textOverflowDesktop = desktopOverflow;
        }}
    }))
})