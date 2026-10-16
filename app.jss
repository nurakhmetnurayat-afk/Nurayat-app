<!DOCTYPE html>
<html lang="kk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lost&Found</title> <!-- ӨЗГЕРТ: браузер қойындысының атауы -->

  <style>
    /* ===== Жалпы стильдер ===== */
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      background: #f2f4fa;
      color: #222;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 0 16px;
    }

    /* ===== Сайт тақырыбы (шапка) ===== */
    header {
      background: #2e3fe6; /* ӨЗГЕРТ: шапка түсі (#2e3fe6 төменде де кездеседі, барлығын ауыстыр) */
      color: white;
      padding: 16px 0;
    }

    header .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    header a {
      color: white;
      margin-left: 16px;
      text-decoration: none;
    }

    /* ===== Іздеу блогы ===== */
    .search-block {
      padding: 32px 0;
    }

    .search-block h1 {
      font-size: 32px;
      margin-bottom: 8px;
    }

    #searchInput {
      width: 100%;
      padding: 12px;
      font-size: 16px;
      border: 2px solid #2e3fe6;
      border-radius: 8px;
      box-sizing: border-box;
    }

    /* ===== Сүзгі түймелері ===== */
    .filters {
      margin: 16px 0;
    }

    .filters button {
      padding: 8px 14px;
      margin-right: 6px;
      border: 1px solid #2e3fe6;
      background: white;
      border-radius: 20px;
      cursor: pointer;
    }

    /* таңдалған сүзгі түймесі */
    .filters button.active {
      background: #2e3fe6;
      color: white;
    }

    /* ===== Заттар карточкалары ===== */
    .items {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 16px;
    }

    .card {
      background: white;
      border-radius: 10px;
      padding: 16px;
      border: 1px solid #ddd;
    }

    .card h3 {
      margin-top: 0;
    }

    .badge {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 12px;
      color: white;
      font-size: 13px;
    }

    .badge.lost  { background: #e8473f; }  /* қызыл: жоғалды */
    .badge.found { background: #1f9d6b; }  /* жасыл: табылды */

    /* ===== Форма ===== */
    .form-block {
      background: white;
      padding: 20px;
      border-radius: 10px;
      margin: 32px 0;
    }

    .form-block input,
    .form-block select,
    .form-block textarea {
      width: 100%;
      padding: 10px;
      margin: 6px 0 14px 0;
      font-size: 15px;
      box-sizing: border-box;
    }

    .form-block button {
      background: #2e3fe6;
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 16px;