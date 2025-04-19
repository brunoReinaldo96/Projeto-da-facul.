// Seleciona o botão e a imagem
const btnSobre = document.querySelector('.nav-link[href="#Sobre"]');
const imgSobre = document.querySelector(".img-sobre img");

// Adiciona um evento de clique ao botão
btnSobre.addEventListener("click", () => {
    imgSobre.classList.add("animate-img"); // Adiciona a classe da animação

    // Remove a classe após a animação terminar, para reaplicação futura
    setTimeout(() => {
        imgSobre.classList.remove("animate-img");
    }, 3000); // 3 segundos para coincidir com a duração da animação
});

// Selecionar todas as imagens clicáveis
document.querySelectorAll(".clickable-img").forEach((img) => {
    img.addEventListener("click", () => {
        const lightbox = document.getElementById("lightbox");
        const lightboxImg = document.getElementById("lightbox-img");

        // Define a imagem clicada no lightbox
        lightboxImg.src = img.src;
        lightbox.classList.add("active");
    });
});

// Fechar o lightbox ao clicar fora da imagem
document.getElementById("lightbox").addEventListener("click", () => {
    document.getElementById("lightbox").classList.remove("active");
});

function startCountdown(elementId, targetDate) {
    const countdownElement = document.getElementById(elementId);
    const interval = setInterval(function () {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(interval);
            countdownElement.innerHTML = "Evento iniciado!";
        } else {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
                (distance % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.innerHTML =
                days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
        }
    }, 1000);
}

function getNextDayOfWeek(dayOfWeek, hour, minute) {
    const now = new Date();
    const resultDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hour,
        minute,
        0,
        0
    );
    const currentDay = now.getDay();

    if (
        currentDay > dayOfWeek || // já passou o dia
        (currentDay === dayOfWeek && now > resultDate) // é hoje, mas já passou o horário
    ) {
        resultDate.setDate(
            resultDate.getDate() + ((7 - currentDay + dayOfWeek) % 7 || 7)
        );
    } else if (currentDay < dayOfWeek) {
        resultDate.setDate(resultDate.getDate() + (dayOfWeek - currentDay));
    }
    // se for hoje e o horário ainda não passou, mantém o dia atual
    return resultDate;
}

// Dias da semana: 0 = Domingo, 1 = Segunda, ..., 6 = Sábado

// Crianças
const tuesdayChildren = getNextDayOfWeek(2, 8, 30); // Terça 08:30
const saturdayChildren = getNextDayOfWeek(6, 13, 30); // Sábado 13:30

// Adolescentes
const tuesdayAdolescents = getNextDayOfWeek(2, 9, 30); // Terça 09:30
const saturdayAdolescents = getNextDayOfWeek(6, 14, 30); // Sábado 14:30

// Adultos
const tuesdayAdults = getNextDayOfWeek(2, 19, 0); // Terça 19:00

// Iniciar contadores
startCountdown("countdown-meninas", tuesdayChildren);
startCountdown("countdown-meninas-sab", saturdayChildren);
startCountdown("countdown-adolescentes", tuesdayAdolescents);
startCountdown("countdown-adolescentes-sab", saturdayAdolescents);
startCountdown("countdown-adultos", tuesdayAdults);
