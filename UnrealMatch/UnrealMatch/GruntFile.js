module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-contrib-less');
 
    grunt.initConfig({
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {                    
                    "Resources/CSS/Reset.css": "Resources/CSS/Reset.less",
                    "Resources/CSS/GameLayout.css": "Resources/CSS/GameLayout.less",
                    "Resources/CSS/HUD.css": "Resources/CSS/HUD.less",
                    "Resources/CSS/StartPage.css": "Resources/CSS/StartPage.less"
                }
            }
        },
        typescript: {
            base: {
                src: ['Resources/Scripts/*.ts', 'Resources/Scripts/**/*.ts'],                
                options: {
                    module: 'amd',
                    target: 'es5',
                    sourceMap: true
                }
            }
        }
    });
 
    grunt.registerTask('default', ['typescript','less']); 

}