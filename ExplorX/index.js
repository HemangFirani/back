  gsap.from("header", {
    y: -100,
    duration: 1.2,
    ease: "power4.out",
  });

  gsap.from(".hero-content", {
    opacity: 0,
    y: 50,
    duration: 1.5,
    ease: "power2.out",
    delay: 0.5,
  });

  gsap.from(".destination-item", {
    opacity: 0,
    y: 30,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".destination-item",
      start: "top 80%",
      end: "bottom 60%",
      toggleActions: "play none none none",
    },
  });

  gsap.from("#about", {
    opacity: 0,
    y: 50,
    duration: 1.2,
    scrollTrigger: {
      trigger: "#about",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  gsap.from("#contact .contact-info, #contact .form", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.3,
    scrollTrigger: {
      trigger: "#contact",
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
  });

  const socialIcons = document.querySelectorAll(".social-icons a");
  socialIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", () => {
      gsap.to(icon, { scale: 1.2, duration: 0.3 });
    });
    icon.addEventListener("mouseleave", () => {
      gsap.to(icon, { scale: 1, duration: 0.3 });
    });
  });

  gsap.to(".hero-button", {
    scale: 1.05,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
    duration: 0.8,
  });

  const destinationImages = document.querySelectorAll(".destination-item img");
  destinationImages.forEach((image) => {
    image.addEventListener("mouseenter", () => {
      gsap.to(image, {
        scale: 1.1,
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
        duration: 0.4,
      });
    });
    image.addEventListener("mouseleave", () => {
      gsap.to(image, {
        scale: 1,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        duration: 0.4,
      });
    });
  });

  gsap.from("footer", {
    opacity: 0,
    y: 50,
    duration: 1.2,
    scrollTrigger: {
      trigger: "footer",
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
  });

  const formInputs = document.querySelectorAll(".form-group input, .form-group textarea");
  formInputs.forEach((input) => {
    input.addEventListener("focus", () => {
      gsap.to(input, { scale: 1.05, duration: 0.3 });
    });
    input.addEventListener("blur", () => {
      gsap.to(input, { scale: 1, duration: 0.3 });
    });
  });
  document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("textarea").value;

    fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => {
        if (response.ok) {
            alert('Message sent successfully!');
            document.getElementById("contactForm").reset();
        } else {
            alert('Error sending message. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
<!-- Include EmailJS SDK -->
