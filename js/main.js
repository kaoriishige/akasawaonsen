/**
 * 塩原温泉 赤沢温泉旅館 - メインスクリプト
 * インタラクティブ機能・予約コンシェルジュ・モーダル・アニメーション
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. スクロールヘッダー効果
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 2. ヒーロースライダー (自動切替)
  const slides = document.querySelectorAll('.hero-slide');
  let currentSlide = 0;
  if (slides.length > 1) {
    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 6000);
  }

  // 3. 日付入力の初期値（本日と明日）
  const checkinInput = document.getElementById('bookingCheckin');
  if (checkinInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    checkinInput.min = `${yyyy}-${mm}-${dd}`;
    checkinInput.value = `${yyyy}-${mm}-${dd}`;
  }

  // 4. 予約バー タブ切り替え
  const bookingTabs = document.querySelectorAll('.booking-tab');
  const bookingRoomSelect = document.getElementById('bookingRoomType');

  bookingTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      bookingTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const tabType = tab.getAttribute('data-tab');
      if (bookingRoomSelect) {
        if (tabType === 'main') {
          bookingRoomSelect.value = 'all-main';
        } else if (tabType === 'sanso') {
          bookingRoomSelect.value = 'sanso-all';
        } else if (tabType === 'camp') {
          bookingRoomSelect.value = 'autocamp';
        } else if (tabType === 'dayuse') {
          // 日帰り入浴セクションへスムーズスクロール
          const dayuseSec = document.getElementById('dayuse');
          if (dayuseSec) {
            dayuseSec.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });
  });

  // 5. 客室フィルター
  const filterBtns = document.querySelectorAll('.room-filter-btn');
  const roomCards = document.querySelectorAll('.room-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');
      roomCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (filterVal === 'all' || cardCat === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });

  // 6. FAQアコーディオン
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 7. 予約プランモーダル
  const modal = document.getElementById('bookingModal');
  const modalClose = document.getElementById('modalCloseBtn');
  const openModalBtns = document.querySelectorAll('.open-booking-modal');
  const modalTargetPlan = document.getElementById('modalTargetPlan');

  function openBookingModal(planTitle = '公式ベストレート宿泊プラン') {
    if (!modal) return;
    if (modalTargetPlan) {
      modalTargetPlan.textContent = planTitle;
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeBookingModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('現在、ホームページ確認用のため、オンライン予約機能は準備中です');
      const planName = btn.getAttribute('data-plan') || '公式直販ベストレート予約';
      openBookingModal(planName);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeBookingModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeBookingModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeBookingModal();
      }
    });
  }

  // 8. 予約検索ボタンの処理 (空室条件をモーダルへ反映 & 準備中案内)
  const searchBtn = document.getElementById('searchRoomsBtn');
  if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('現在、ホームページ確認用のため、オンライン予約機能は準備中です');
    });
  }

  // 9. モバイルナビゲーション（ドロワーメニュー連動）
  const mobileToggle = document.querySelector('.nav-toggle-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const drawerClose = document.querySelector('.mobile-nav-close');

  function openMobileNav() {
    if (drawer) drawer.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (drawer) drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      openMobileNav();
    });
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', closeMobileNav);
  }

  if (overlay) {
    overlay.addEventListener('click', closeMobileNav);
  }
});

