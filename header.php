<!DOCTYPE html>
<html lang="ru">
	<head>
		<?php $meta_tag_contents = get_translated_meta_tag_contents(); ?>
		
		<title><?php echo $meta_tag_contents['title']; ?></title>
		
		<meta charset="UTF-8">
		
		<?php if(!is_empty($meta_tag_contents['description'])): ?>
			<meta name="description" content="<?php echo $meta_tag_contents['description']; ?>"> 
		<?php endif; ?>
		
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		
		<link rel="shortcut icon" href="/wp-content/themes/feor/public/img/favicon.png" type="image/png">
		<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700,800|Roboto:400,700,900&amp;subset=cyrillic-ext,latin-ext" rel="stylesheet">
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.0/css/swiper.min.css">
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
		<link rel="stylesheet" href="/wp-content/themes/feor/public/css/main.min.css">
		<link rel="stylesheet" href="/wp-content/themes/feor/style.css">
	</head>

	<body <?php echo body_class(); ?>>
		<div class="page page_main">
			<div class="header page__header">
				<div class="container header__container">
					<?php /*<div id="js-lang" class="lang header__lang">
						<ul id="js-langList" class="lang__list">
							<li class="lang__item">
								<a data-text="English" href="/?custom_action=change_lang&lang=en&redirect=<?php echo $_SERVER['REQUEST_URI']; ?>">English</a>
							</li>
							
							<li class="lang__item">
								<a data-text="Russian" href="/?custom_action=change_lang&lang=ru&redirect=<?php echo $_SERVER['REQUEST_URI']; ?>">Russian</a>
							</li>
						</ul>

						<span id="js-langPicked" class="lang__picked"><?php echo get_translated_content('English'); ?></span>
					</div>*/ ?>

					<div class="header__content header__content_position_top">
						<button id="js-hamburger" class="hamburger hamburger_squeeze header__hamburger" type="button">
							<span class="hamburger-box">
								<span class="hamburger-inner"></span>
							</span>
						</button>

						<a href="/" class="logo header__logo">
							<!-- <img src="public/img/logo.png" class="header__logo-img" alt="FEOR"> -->
						</a>

						<ul id="js-menu" class="menu header__menu top-menu">
							<li class="menu__item header__menu-item menu-item">
								<a href="/about-us" class="menu__link header__menu-link">О Федерации</a>
								<div class="hidden-block">
									<ul>
										<li><a href="/about-us/#main-target">Цели и задачи</a></li>
										<li><a href="/ravvin-blog">Блог Президента</a></li>
										<li><a href="/activity">Деятельность</a></li>
										<li><a href="/press-center">События</a></li>
										<li><a href="/fiddler-on-roof">Премия "Скрипач на крыше"</a></li>
										<li><a href="/donate">Поддержать ФЕОР</a></li>
									</ul>
								</div>
							</li>
							
							<li class="menu__item header__menu-item menu-item">
								<a href="#" class="menu__link header__menu-link">Общины</a>
								<div class="hidden-block">
									<ul>
										<li><a href="/administrative-units/czentralnyj">Центральный округ</a></li>
										<li><a href="/administrative-units/severo-zapadnyj">Северо-Западный округ</a></li>
										<li><a href="/administrative-units/privolzhskij">Приволжский округ</a></li>
										<li><a href="/administrative-units/yuzhnyj">Южный округ</a></li>
										<li><a href="/administrative-units/severo-kavkazkij">Северо-Кавказский округ</a></li>
										<li><a href="/administrative-units/uralskij">Уральский округ</a></li>
										<li><a href="/administrative-units/sibirskij">Сибирский округ</a></li>
										<li><a href="/administrative-units/dalnevostochnyj">Дальневосточный округ</a></li>
									</ul>
								</div>
							</li>
							
							<li class="menu__item header__menu-item menu-item">
								<a href="#" class="menu__link header__menu-link">Традиции</a>
								<div class="hidden-block">
									<ul>
										<li><a href="#">Календарь</a></li>
										<li><a href="#">Шаббат</a></li>
										<li><a href="#">Праздники</a></li>
										<li><a href="#">Обряды</a></li>
									</ul>
								</div>
							</li>

							<li class="menu__item header__menu-item menu-item">
								<a href="/organizations" class="menu__link header__menu-link">Организации</a>
								<div class="hidden-block">
									<ul>
										<li><a href="/organizations/#glavnyj-ravvinat">Главный раввинат</a></li>
										<li><a href="/organizations/#obrazovatelnie-uchrezhdeniya">Образовательные учреждения</a></li>
										<li><a href="/organizations/#molodezhnye-proekty">Молодежные проекты</a></li>
										<li><a href="/organizations/#blagotvoritelnye-czentry">Благотворительные центры</a></li>
										<li><a href="/organizations/#izdatelstva-i-media">Издательства и медиа</a></li>
										<li><a href="/organizations/#knizhnye-magaziny">Книжные магазины</a></li>
										<li><a href="/organizations/#koshernye-restorany">Кошерные рестораны</a></li>
										<li><a href="/organizations/#koshernye-magaziny">Кошерные магазины</a></li>
										<li><a href="/organizations/#mikvy">Миквы</a></li>
										<li><a href="/organizations/#evrejskie-muzei">Еврейские музеи</a></li>
										<li><a href="/organizations/#kladbishha-i-ritualnye-uslugi">Кладбища и ритуальные услуги</a></li>
									</ul>
								</div>
							</li>

							<li class="menu__item header__menu-item menu-item">
								<a href="/activities" class="menu__link header__menu-link">Программы</a>
								<div class="hidden-block">
									<ul>
										<li><a href="/activities/religiya">Религиозная деятельность</a></li>
										<li><a href="/activities/molodezh">Молодежные программы</a></li>
										<li><a href="/activities/soczialnaya-rabota">Социальная работа</a></li>
										<li><a href="/activities/prosveshhenie">Просветительская деятельность</a></li>
										<li><a href="/activities/kultura">Культурная деятельность</a></li>
										<li><a href="#">Ветераны</a></li>
									</ul>
								</div>
							</li>
						</ul>

						<button class="search header__search" data-toggle="modal" data-target="#js-modalSearch">
							<span class="search__icon icon-search"></span>
							<span class="search__text"><?php echo get_translated_content('Поиск'); ?></span>
						</button>

						<div class="header__content header__content_position_bottom">
							<a href="/donate" class="button button_color_blue header__button" data-text="<?php echo get_translated_content('Поддержать'); ?>"><?php echo get_translated_content('Поддержать'); ?></a>
						</div>
					</div>

					
				</div>
			</div>
			<!-- header -->