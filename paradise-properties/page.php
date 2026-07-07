<?php
/**
 * Default page template.
 *
 * @package Paradise
 */

get_header();

while ( have_posts() ) :
	the_post();
	?>

	<section class="page-hero">
		<div class="container">
			<h1 class="page-hero__title"><?php the_title(); ?></h1>
		</div>
	</section>

	<section class="section">
		<div class="container container--narrow">
			<div class="entry-content reveal">
				<?php the_content(); ?>
			</div>
		</div>
	</section>

	<?php
endwhile;

get_footer();
