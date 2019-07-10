<?php get_header(); ?>
<div class="container">
  <div>
    <?php if ( !is_front_page() && !is_home() ) : ?>
      <h1><?php wp_title( '' ); ?></h1>
    <?php endif; ?>
    <!-- Content START -->
    <div class="content">
      <?php get_search_form(); ?>
      <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
        <ul>
          <li><a href="<?php the_permalink() ?>"><?php the_title() ?></a></li>
        </ul>
      <?php endwhile; else: ?>
        <p><?php _e( 'No search result found.', 'boilerplate-slug' ) ?></p>
      <?php endif; ?>
    </div>
    <!-- Content END -->
  </div>
</div>
<?php get_footer(); ?>
