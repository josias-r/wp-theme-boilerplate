<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title><?php bloginfo('name'); wp_title(); ?></title>
  <meta name="og:title" content="<?php bloginfo('name'); wp_title(); ?>">
  <?php if ( has_excerpt() && is_singular() ) : ?>
    <meta name="description" content="<?php echo esc_html( get_the_excerpt() ); ?>">
    <meta name="og:description" content="<?php echo esc_html( get_the_excerpt() ); ?>">
  <?php else: ?>
    <meta name="description" content="<?php bloginfo('description'); ?>">
    <meta name="og:description" content="<?php bloginfo('description'); ?>">
  <?php endif; ?>
  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Montserrat:400,600&display=swap" rel="stylesheet">
  <!-- Stylesheets START -->
  <!-- Main -->
  <link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/dist/stylesheets/main.css">
  <!-- Stylesheets END -->
  <!-- Head Hook -->
  <?php wp_head(); ?>
</head>
<body data-barba="wrapper" <?php body_class(); ?>>
  <main data-barba="container" data-barba-namespace="<?php echo join( ' ', get_body_class() ) ?>">
    <!-- Navigation START -->
    <nav>
      <?php $args = array(
        'theme_location'  => 'header-nav',
        // 'container' => 'ul
      );
      wp_nav_menu($args); ?>
    </nav>
    <!-- Navigation END -->
