<?php get_header(); ?>
<div class="container">
  <div>
    <!-- Content START -->
    <div class="content">
      <?php if ( have_posts() ) : while ( have_posts() ) : the_post();
        the_content();
      endwhile; endif; ?>
    </div>
    <!-- Content END -->
  </div>
</div>
<?php get_footer(); ?>
