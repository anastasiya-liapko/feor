 <?php get_header(); ?>
        <div class="image-gallery">
            <div class="container">
                <div class="row">
                	<?php if ( have_posts() ) :  while ( have_posts() ) : the_post(); ?>
			

                    <h1 class="image-gallery-title"><?php the_title(); ?></h1>
                    <?php the_content(); ?>

                    
                    <?php endwhile; ?>
					<?php endif; ?>
                </div>
            </div>
        </div>
<?php get_footer(); ?>