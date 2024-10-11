// Hesaplama ve grafik gösterim fonksiyonu
function calculateCarbonFootprint() {
    const transport = document.getElementById('transport').value;
    const energy = document.getElementById('energy').value;
    const mobile = document.getElementById('mobile').value;
    const paper = document.getElementById('paper').value;

    let transportEmissions = 0;
    let energyEmissions = 0;
    let mobileEmissions = 0;
    let paperEmissions = 0;

    // Ulaşım emisyonları (araba: 0.27 kg CO2/km, toplu taşıma: 0.1 kg CO2/km, motosiklet: 0.15 kg CO2/km, bisiklet: 0 kg CO2)
    if (transport === 'car') {
        transportEmissions = 5 * 0.27; // 5 km varsayalım
    } else if (transport === 'public_transport') {
        transportEmissions = 5 * 0.1;
    } else if (transport === 'motorcycle') {
        transportEmissions = 5 * 0.15; // Motosiklet için km başına 0.15 kg CO2
    }

    // Enerji emisyonları (0.05 kg CO2/saat)
    energyEmissions = energy * 0.05;

    // Cep telefonu emisyonları (0.02 kg CO2/saat)
    mobileEmissions = mobile * 0.02;

    // Kağıt emisyonları (0.004 kg CO2/sayfa)
    paperEmissions = paper * 0.004;

    // Toplam karbon ayak izi hesaplama
    const totalEmissions = transportEmissions + energyEmissions + mobileEmissions + paperEmissions;

    // Sonucu göster
    document.getElementById('result').innerText = `Bugünkü karbon ayak iziniz: ${totalEmissions.toFixed(2)} kg CO2`;

    // Grafik oluşturma
    const ctx = document.getElementById('carbonChart').getContext('2d');
    
    // Mevcut grafik varsa önce sil
    if (window.carbonChart) {
        window.carbonChart.destroy();
    }

    window.carbonChart = new Chart(ctx, {
        type: 'bar', // Bar grafik türü
        data: {
            labels: ['Orman Tahribatı', 'Deniz Seviyesi Artışı', 'Hava Kalitesinin Bozulması'],
            datasets: [{
                label: 'Dünya Üzerindeki Etkiler (kg CO2)',
                data: [totalEmissions * 0.2, totalEmissions * 0.3, totalEmissions * 0.5], // Örnek etkiler
                backgroundColor: ['#FF5733', '#33C1FF', '#FFBD33'], // Farklı renklerde etkiler
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
