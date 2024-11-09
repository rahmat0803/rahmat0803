document.addEventListener("DOMContentLoaded", function () {
    const map = L.map("map").setView([-6.1261842,120.4642113], 18);

    const umkmData = {
        name: "Mie Jebew",
        rating: "4.2",
        reviews: 33,
        category: "Usaha makanan",
        buka: "Buka 07:30 Tutup pukul 21.00",
        alamat: "Jl. Jend. Ahmad Yani No.45, Benteng, Kec. Benteng, Kab. Kepulauan Selayar, Sulawesi Selatan 92812",
        phone: "082",
        coords: [-6.1261842,120.4642113],
        imageUrl: "./miejebew.jpg",
        hours: {
            Senin: "08.00–00.00",
            Selasa: "08.00–00.00",
            Rabu: "08.00–00.00",
            Kamis: "08.00–00.00",
            Jumat: "08.00–02.00",
            Sabtu: "08.00–02.00",
            Minggu: "08.00–00.00",
        },
    };

    const marker = L.marker(umkmData.coords).addTo(map);

    // Menambahkan tooltip permanen pada marker
    marker.bindTooltip(umkmData.name, {
        permanent: true,
        direction: "top",
        className: "marker-tooltip",
    });

    marker.bindPopup(`
        <div class="popup-container">
            <div class="popup-header">${umkmData.name}</div>
            <div class="popup-rating">⭐ ${umkmData.rating} <span>(${umkmData.reviews})</span></div>
            <div class="popup-category">${umkmData.category}</div>
            <img src="${umkmData.imageUrl}" alt="${umkmData.name}" class="popup-image" />
            <div class="popup-address"><i class="fas fa-map-marker-alt"></i> ${umkmData.alamat}</div>
            <div class="popup-hours"><i class="fas fa-clock"></i> <span>${umkmData.buka}</span></div>
            <div class="popup-contact"><i class="fas fa-phone-alt"></i> ${umkmData.phone}</div>
        </div>
    `);

    fetch("./jalanBentengku.geojson")
        .then((response) => response.json())
        .then((geojsonData) => {
            L.geoJSON(geojsonData, {
                style: {
                    color: "#f0f0f0",
                    weight: 3,
                    opacity: 1,
                },
            }).addTo(map);
        })
        .catch((error) =>
            console.error("Error loading jalan GeoJSON:", error)
        );

    fetch("./kecamatanBentengku.geojson")
        .then((response) => response.json())
        .then((geojsonData) => {
            L.geoJSON(geojsonData, {
                style: {
                    color: "#333",
                    weight: 1.5,
                    opacity: 0.8,
                    fillColor: "#333",
                    fillOpacity: 0.1,
                },
            }).addTo(map);
        })
        .catch((error) =>
            console.error("Error loading kecamatanBenteng GeoJSON:", error)
        );
});
