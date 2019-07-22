<?php /* Template Name: Blog */ ?>
<?php get_header(); ?>
<div class="container">
  <div>
    <?php if ( !is_front_page() && !is_home() ) : ?>
      <h1><?php wp_title( '' ); ?></h1>
    <?php endif; ?>
    <!-- Content START -->
    <div class="content">
      <?php $paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1; ?>
      <!-- Page Content START -->
      <?php if ( have_posts() && $paged === 1 ) : while ( have_posts() ) : the_post();
        the_content();
      endwhile; endif; ?>
      <?php
      $query = new WP_Query( array(
        "post_type" => "post",
        'paged'     => $paged
      ) );
      ?>
      <!-- Page Content END -->
      <!-- Post Loop START -->
      <?php if($query->have_posts() ): while($query->have_posts() ): $query->the_post(); ?>
        <div class="blog-item">
          <div class="text">
            <div>
              <h2><?php the_title(); ?></h2>
              <?php esc_html( the_excerpt() ); ?>
            </div>
            <a class="btn" href="<?php the_permalink(); ?>"><?php _e( 'view', 'boilerplate-slug' ) ?></a>
          </div>
          <div class="image">
            <a href="<?php the_permalink(); ?>"></a>
            <?php if ( has_post_thumbnail() ) : the_post_thumbnail(); else: ?>
              <img src="<?php echo get_theme_file_uri( 'assets/images/404.svg' ); ?>" alt="404 no post thumbnail">
            <?php endif; ?>
          </div>
        </div>
      <?php endwhile; endif; ?>
      <!-- Post Loop END -->
      <!-- Pagination START -->
      <div class="pagination">
        <?php
        echo paginate_links( array(
        'format'  => 'page/%#%',
        'current' => $paged,
        'total'   => $query->max_num_pages,
        'mid_size'        => 2,
        'prev_text'       => __('&laquo;'),
        'next_text'       => __('&raquo;')
        ) );
        ?>
      </div>
      <!-- Pagination END -->
    </div>
    <!-- Content END -->
  </div>
</div>
<?php get_footer(); ?>
