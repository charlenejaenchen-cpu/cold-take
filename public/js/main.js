// --- DROPDOWNS TAKES INDEX---

/* filter enabled for now, need to add tags to take publish first: future feat. add
const filterBtn = document.getElementById('filter-btn');
const filterMenu = document.getElementById('filter-menu');
*/

const sortBtn = document.getElementById('sort-btn');
const sortMenu = document.getElementById('sort-menu');

/* filter enabled for now, need to add tags to take publish first: future feat. add
filterBtn.addEventListener('click', () => {
    filterMenu.classList.toggle('hidden');
    sortMenu.classList.add('hidden');
});
*/

sortBtn.addEventListener('click', () => {
    sortMenu.classList.toggle('hidden');
    filterMenu.classList.add('hidden');
});


// --- SORT TAKES INDEX---
const sortOptions = document.querySelectorAll('.sort-option');
const articleGrid = document.querySelector('.article-grid');

sortOptions.forEach(option => {
    option.addEventListener('click', () => {
        const sortBy = option.dataset.sort;
        sortMenu.classList.add('hidden');   
        const cards = Array.from(articleGrid.querySelectorAll('.article-card'));

        cards.sort((a, b) => {
            if (sortBy === 'newest') {
                return new Date(b.dataset.publishedat) - new Date(a.dataset.publishedat);             // learning: new Date() converts Date into milsecs from 1. Jan 1970, thats why we can calculate
            } else if (sortBy === 'oldest') {
                return new Date(a.dataset.publishedat) - new Date(b.dataset.publishedat);
            } else if (sortBy === 'most-viewed') {
                return b.dataset.viewcount - a.dataset.viewcount;
            }
        });

        cards.forEach(card => articleGrid.appendChild(card));
    });
});

