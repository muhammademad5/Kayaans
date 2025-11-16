// Donut Chart - الدول الأكثر إستماعا
const donutCtx = document.getElementById('donutChart');
if (donutCtx) {
    const donutChart = new Chart(donutCtx, {
        type: 'doughnut',
        data: {
            labels: ['مصر', 'الجزائر'],
            datasets: [{
                data: [66.7, 33.3],
                backgroundColor: ['#3B82F6', '#F97316'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            },
            cutout: '65%',
            layout: {
                padding: 10
            }
        },
        plugins: [{
            id: 'doughnutLabel',
            afterDraw: function(chart) {
                const ctx = chart.ctx;
                const chartArea = chart.chartArea;
                const centerX = (chartArea.left + chartArea.right) / 2;
                const centerY = (chartArea.top + chartArea.bottom) / 2;
                
                ctx.save();
                
                // Draw percentage on each segment
                const meta = chart.getDatasetMeta(0);
                const data = chart.data.datasets[0].data;
                
                meta.data.forEach((arc, index) => {
                    if (!arc) return;
                    
                    const model = arc;
                    const startAngle = model.startAngle;
                    const endAngle = model.endAngle;
                    const angle = (startAngle + endAngle) / 2;
                    
                    // Calculate position in the middle of the segment (closer to outer edge)
                    const segmentWidth = model.outerRadius - model.innerRadius;
                    const radius = model.innerRadius + (segmentWidth * 0.6);
                    const x = centerX + Math.cos(angle) * radius;
                    const y = centerY + Math.sin(angle) * radius;
                    
                    // Draw white text with shadow for better visibility
                    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
                    ctx.shadowBlur = 3;
                    ctx.shadowOffsetX = 1;
                    ctx.shadowOffsetY = 1;
                    ctx.fillStyle = '#FFFFFF';
                    ctx.font = 'bold 20px Arial';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(data[index].toFixed(1) + '%', x, y);
                    ctx.shadowBlur = 0;
                    ctx.shadowOffsetX = 0;
                    ctx.shadowOffsetY = 0;
                });
                
                ctx.restore();
            }
        }]
    });
}

// Horizontal Bar Chart - الدول الأكثر إستماعا
const barCtx = document.getElementById('barChart');
if (barCtx) {
    new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: ['مصر', 'الجزائر'],
            datasets: [{
                label: 'الدول الأكثر إستماعا',
                data: [2, 1],
                backgroundColor: ['#60A5FA', '#34D399'],
                borderWidth: 0,
                barThickness: 40
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 2.5,
                    ticks: {
                        stepSize: 0.5,
                        font: {
                            size: 12
                        },
                        color: 'rgba(255, 255, 255, 0.7)'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        font: {
                            size: 12
                        },
                        color: 'rgba(255, 255, 255, 0.7)'
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                }
            }
        }
    });
}

// Grouped Bar Chart - الفئات العمرية
const ageCtx = document.getElementById('ageChart');
if (ageCtx) {
    new Chart(ageCtx, {
        type: 'bar',
        data: {
            labels: ['Sep 2025', 'Oct 2025', 'Nov 2025'],
            datasets: [
                {
                    label: 'فئة Average: (24 - 18)',
                    data: [12, 87, 40],
                    backgroundColor: '#3B82F6',
                    borderWidth: 0
                },
                {
                    label: 'فئة Average: (34 - 25)',
                    data: [20, 10, 50],
                    backgroundColor: '#FBBF24',
                    borderWidth: 0
                },
                {
                    label: 'فئة Average: (44 - 35)',
                    data: [50, 50, 10],
                    backgroundColor: '#EC4899',
                    borderWidth: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            size: 13,
                            weight: '600'
                        },
                        color: 'rgba(255, 255, 255, 0.95)',
                        generateLabels: function(chart) {
                            const original = Chart.defaults.plugins.legend.labels.generateLabels;
                            const labels = original.call(this, chart);
                            labels.forEach((label, index) => {
                                const dataset = chart.data.datasets[index];
                                const colors = ['#3B82F6', '#FBBF24', '#EC4899'];
                                label.fillStyle = colors[index] || dataset.backgroundColor;
                                label.strokeStyle = colors[index] || dataset.backgroundColor;
                            });
                            return labels;
                        }
                    }
                },
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + '%';
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: false,
                    ticks: {
                        font: {
                            size: 12
                        },
                        color: 'rgba(255, 255, 255, 0.7)',
                        maxRotation: 45,
                        minRotation: 45
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        callback: function(value) {
                            return value + '%';
                        },
                        font: {
                            size: 12
                        },
                        color: 'rgba(255, 255, 255, 0.7)'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        drawBorder: false
                    }
                }
            },
            barPercentage: 0.7,
            categoryPercentage: 0.8
        }
    });
}

// Vertical Bar Chart - توزيع الجنس
const genderCtx = document.getElementById('genderChart');
if (genderCtx) {
    new Chart(genderCtx, {
        type: 'bar',
        data: {
            labels: ['2025'],
            datasets: [
                {
                    label: 'نسبة الذكور :Average',
                    data: [27.5],
                    backgroundColor: '#60A5FA',
                    borderWidth: 0
                },
                {
                    label: 'نسبة الإناث : Average',
                    data: [55],
                    backgroundColor: '#FBBF24',
                    borderWidth: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + '%';
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        font: {
                            size: 12
                        },
                        color: 'rgba(255, 255, 255, 0.7)',
                        maxRotation: 45,
                        minRotation: 45
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 60,
                    ticks: {
                        stepSize: 10,
                        callback: function(value) {
                            return value + '%';
                        },
                        font: {
                            size: 12
                        },
                        color: 'rgba(255, 255, 255, 0.7)'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        drawBorder: false
                    }
                }
            },
            barPercentage: 0.6,
            categoryPercentage: 0.8
        }
    });
}

// Sidebar Toggle Functionality
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const menuToggle = document.getElementById('menuToggle');
const sidebarClose = document.getElementById('sidebarClose');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function openSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (sidebarToggle) {
    sidebarToggle.addEventListener('click', openSidebar);
}

if (menuToggle) {
    menuToggle.addEventListener('click', openSidebar);
}

if (sidebarClose) {
    sidebarClose.addEventListener('click', closeSidebar);
}

if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
}

// Close sidebar on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
        closeSidebar();
    }
});

// Handle window resize to ensure sidebar state is correct
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        // Desktop: ensure sidebar is visible
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

