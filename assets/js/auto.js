$(document).ready(function()
	{	
		var continue_auto = true;
	
		function checkTouchStop()
			{
				checking_touch_stop = setInterval(function()
					{
						if (touching_robot == true) //obstacle got in way of robot
						{
							$('#obstruction').html('Obstruction Wins');
							$('#field').stopLayer('robot577');
							
							$('#field').animateLayer('robot577', {
								fillStyle: "pink"
							}, 1);
							
							clearInterval(timeVar);
							write_nxt('Auto End');
							continue_auto = false;
						}
						else
						{
							continue_auto = true;
						}
						
					},10);
			}
		
		checkTouchStop();
		
		function stopCheckStop()
			{
				clearInterval(checking_touch_stop);
			}
		
		stopCheckStop();
		
		////////////////////////////////////////////////////////////////TIMER////////////////////////////////////////////////////////////////
		
		//set up the timer div to read "0" because the puzzle hasn't loaded yet and the user hasn't started
		$('#timer').html('Time: 0 sec');
		
		//this function makes it so that i can call this function and start the timer functions which will happen every second
		function setTimer()
			{
				timeVar = setInterval(function()
					{
						timer();
					},1000);
			}
			
		//this function adds 1 second to the time that shows up in the time div and changes the time div to read the time
		function timer()
			{
				time = time+1;
				$('#timer').html('Time: '+time+' sec');
			}
		
		//this function is called when the time has to pause or stop
		function stopTime()
			{
				clearInterval(timeVar);
			}
		
		////////////////////////////////////////////////////////////////NXT////////////////////////////////////////////////////////////////
	
		var body_x = 150;
		var body_y = 165;
	
		//nxt body
		$('#field').drawRect({
		  layer: true,
		  name: 'nxt_body',
		  strokeStyle: 'darkgray',
		  fillStyle: "#efefef",
		  strokeWidth: 4,
		  x: body_x, y: body_y,
		  width: 250,
		  height: 300,
		  cornerRadius: 10
		});
		
		//nxt screen
		$('#field').drawRect({
		  layer: true,
		  name: 'nxt_screen',
		  strokeStyle: 'bdbdbd',
		  fillStyle: "#bdbdbd",
		  strokeWidth: 4,
		  x: body_x, y: body_y - 65,
		  width: 150,
		  height: 100,
		  cornerRadius: 10
		});
		
		//nxt left arrow
		$('canvas').drawPolygon({
		  layer: true,
		  name: 'nxt_left_arrow',
		  strokeStyle: 'darkgray',
		  fillStyle: 'darkgray',
		  strokeWidth: 4,
		  x: body_x - 80, y: body_y + 35,
		  radius: 30,
		  rotate: 270,
		  sides: 3,
		  click: function(layer) {
		    left_clicked();
		  }
		});
		
		//nxt right arrow
		$('canvas').drawPolygon({
		  layer: true,
		  name: 'nxt_right_arrow',
		  strokeStyle: 'darkgray',
		  fillStyle: 'darkgray',
		  strokeWidth: 4,
		  x: body_x + 80, y: body_y + 35,
		  radius: 30,
		  rotate: 90,
		  sides: 3,
		  click: function(layer) {
		    right_clicked();
		  }
		});
		
		//nxt middle button
		$('#field').drawRect({
		  layer: true,
		  name: 'nxt_middle_button',
		  strokeStyle: 'orange',
		  fillStyle: "orange",
		  strokeWidth: 4,
		  x: body_x, y: body_y + 35,
		  width: 50,
		  height: 50,
		  cornerRadius: 10,
		  click: function(layer) {
		    middle_clicked();
		  }
		});
		
		//nxt bottom button
		$('#field').drawRect({
		  layer: true,
		  name: 'nxt_bottom_button',
		  strokeStyle: 'darkgray',
		  fillStyle: "darkgray",
		  strokeWidth: 4,
		  x: body_x, y: body_y + 85,
		  width: 50,
		  height: 25,
		  cornerRadius: 9,
		  click: function(layer) {
		  	window.location.href=window.location.href;
		  }
		});
		
		var nxt_text = "Auto";
		
		//nxt text
		$('#field').drawText({
		  layer: true,
		  name: 'nxt_text',
		  fillStyle: 'black',
		  strokeStyle: 'black',
		  strokeWidth: 1,
		  x: body_x, y: body_y - 65,
		  fontSize: 24,
		  fontFamily: 'Verdana, sans-serif',
		  text: nxt_text
		});
		
		////////////////////////////////////////////////////////////////FIELD SET UP////////////////////////////////////////////////////////////////
		
		field_body_x = 650;
		field_body_y = 310;
		field_body_side = 600;
		
		//origin is top left of field body
		origin_x = field_body_x - (field_body_side / 2);
		origin_y = field_body_y - (field_body_side / 2);
		
		//field body
		$('#field').drawRect({
		  layer: true,
		  name: 'field_body',
		  strokeStyle: 'black',
		  fillStyle: "#8682a1",
		  strokeWidth: 5,
		  x: field_body_x, y: field_body_y,
		  width: field_body_side,
		  height: field_body_side,
		  click: function(layer) {
		  	window.location.href=window.location.href;
		  }
		})
		
		//BLUE SIDE
		
		//first blue diagonal
		$('#field').drawLine({
		  layer: true,
		  name: 'first_blue_diagonal',
		  strokeStyle: '#0000ff',
		  strokeWidth: 10,
		  x1: origin_x, y1: field_body_side / 3,
		  x2: origin_x + field_body_side / 3, y2: origin_y
		});
		
		
		//blue pendulum tape
		$('#field').drawLine({
		  layer: true,
		  name: 'blue_pendulum_tape',
		  strokeStyle: '#0000ff',
		  strokeWidth: 10,
		  x1: origin_x + field_body_side / 2, y1: origin_y + field_body_side / 4,//bottom right
		  x2: origin_x + field_body_side / 2.4, y2: origin_y + field_body_side / 6,//top right
		  x3: origin_x + field_body_side / 6, y3: origin_y + field_body_side / 2.4,//top left
		  x4: origin_x + field_body_side / 4, y4: origin_y + field_body_side / 2//bottom left
		});
		
		//blue bin 1
		$('#field').drawRect({
		  layer: true,
		  name: 'blue_bin_1',
		  strokeStyle: 'darkgray',
		  fillStyle: "white",
		  strokeWidth: 3,
		  x: origin_x + 255, y: origin_y + 145,
		  width: 40,
		  height: 40,
		  rotate: 45,
		  click: function(layer) {   //move IR beacon to blue bin 1
			if (begin_auto == false)
				{
					ir_location = 1;
					$('#field').animateLayer('red_ir_beacon', {
							x: origin_x + 345, y: origin_y + 455
						}, 0);
					$('#field').animateLayer('blue_ir_beacon', {
							x: origin_x + 255, y: origin_y + 145
						}, 0);
				}
		  }
		});
		
		//blue bin 2
		$('#field').drawRect({
		  layer: true,
		  name: 'blue_bin_2',
		  strokeStyle: 'darkgray',
		  fillStyle: "white",
		  strokeWidth: 3,
		  x: origin_x + 220, y: origin_y + 180,
		  width: 40,
		  height: 40,
		  rotate: 45,
		  click: function(layer) {   //move IR beacon to blue bin 2
			if (begin_auto == false)
				{
					ir_location = 2;
					$('#field').animateLayer('red_ir_beacon', {
							x: origin_x + 380, y: origin_y + 420
						}, 0);
					$('#field').animateLayer('blue_ir_beacon', {
							x: origin_x + 220, y: origin_y + 180
						}, 0);
				}
		  }
		});
		
		//blue bin 3
		$('#field').drawRect({
		  layer: true,
		  name: 'blue_bin_3',
		  strokeStyle: 'darkgray',
		  fillStyle: "white",
		  strokeWidth: 3,
		  x: origin_x + 185, y: origin_y + 215,
		  width: 40,
		  height: 40,
		  rotate: 45,
		  click: function(layer) {   //move IR beacon to blue bin 3
			if (begin_auto == false)
				{
					ir_location = 3;
					$('#field').animateLayer('red_ir_beacon', {
							x: origin_x + 415, y: origin_y + 385
						}, 0);
					$('#field').animateLayer('blue_ir_beacon', {
							x: origin_x + 185, y: origin_y + 215
						}, 0);
				}
		  }
		});
		
		//blue bin 4
		$('#field').drawRect({
		  layer: true,
		  name: 'blue_bin_4',
		  strokeStyle: 'darkgray',
		  fillStyle: "white",
		  strokeWidth: 3,
		  x: origin_x + 150, y: origin_y + 250,
		  width: 40,
		  height: 40,
		  rotate: 45,
		  click: function(layer) {   //move IR beacon to blue bin 4
			if (begin_auto == false)
				{
					ir_location = 4;
					$('#field').animateLayer('red_ir_beacon', {
							x: origin_x + 450, y: origin_y + 350
						}, 0);
					$('#field').animateLayer('blue_ir_beacon', {
							x: origin_x + 150, y: origin_y + 250
						}, 0);
				}
		  }
		});
		
		
		
		//RAMP
		$('#field').drawLine({
		  layer: true,
		  name: 'ramp_wood',
		  fillStyle: "black",
		  strokeStyle: 'black',
		  strokeWidth: 10,
		  x1: origin_x + field_body_side / 4, y1: origin_y + field_body_side / 2,//top left
		  x2: origin_x + field_body_side / 2, y2: origin_y + field_body_side / (600/450),//bottom left
		  x3: origin_x + field_body_side / (600/450), y3: origin_y + field_body_side / 2,//bottom right
		  x4: origin_x + field_body_side / 2, y4: origin_y + field_body_side / 4,//top right
	      x5: origin_x + field_body_side / 4 - 4, y5: origin_y + field_body_side / 2 + 4 //connect back to top left
		});
		
		//blue mid line
		$('#field').drawLine({
		  layer: true,
		  name: 'blue_mid_line',
		  strokeStyle: '#0000ff',
		  strokeWidth: 10,
		  x1: origin_x - 7, y1: field_body_side - 5 + 12,
		  x2: origin_x + field_body_side - 5 + 6, y2: origin_y - 7
		});
		
		//RED SIDE
		
		//red mid line
		$('#field').drawLine({
		  layer: true,
		  name: 'red_mid_line',
		  strokeStyle: '#ff0000',
		  strokeWidth: 10,
		  x1: origin_x, y1: field_body_side + 5 + 10,
		  x2: origin_x + field_body_side + 5 + 2, y2: origin_y
		});
		
		//red pendulum tape
		$('#field').drawLine({
		  layer: true,
		  name: 'red_pendulum_tape',
		  strokeStyle: '#ff0000',
		  strokeWidth: 10,
		  x1: origin_x + field_body_side / (600/450), y1: origin_y + field_body_side / 2,//top right
		  x2: origin_x + field_body_side / (600/500), y2: origin_y + field_body_side / (600/350),//bottom right
		  x3: origin_x + field_body_side / (600/350), y3: origin_y + field_body_side / (600/500),//bottom left
		  x4: origin_x + field_body_side / 2, y4: origin_y + field_body_side / (600/450)//top left
		});
		
		
		//red bin 1
		$('#field').drawRect({
		  layer: true,
		  name: 'red_bin_1',
		  strokeStyle: 'darkgray',
		  fillStyle: "white",
		  strokeWidth: 3,
		  x: origin_x + 345, y: origin_y + 455,
		  width: 40,
		  height: 40,
		  rotate: 45,
		  click: function(layer) {   //move IR beacon to red bin 1
			if (begin_auto == false)
				{
					ir_location = 1;
					$('#field').animateLayer('red_ir_beacon', {
							x: origin_x + 345, y: origin_y + 455
						}, 0);
					$('#field').animateLayer('blue_ir_beacon', {
							x: origin_x + 255, y: origin_y + 145
						}, 0);
				}
		  }
		});
		
		//red bin 2
		$('#field').drawRect({
		  layer: true,
		  name: 'red_bin_2',
		  strokeStyle: 'darkgray',
		  fillStyle: "white",
		  strokeWidth: 3,
		  x: origin_x + 380, y: origin_y + 420,
		  width: 40,
		  height: 40,
		  rotate: 45,
		  click: function(layer) {   //move IR beacon to red bin 2
			if (begin_auto == false)
				{
					ir_location = 2;
					$('#field').animateLayer('red_ir_beacon', {
							x: origin_x + 380, y: origin_y + 420
						}, 0);
					$('#field').animateLayer('blue_ir_beacon', {
							x: origin_x + 220, y: origin_y + 180
						}, 0);
				}
		  }
		});
		
		//red bin 3
		$('#field').drawRect({
		  layer: true,
		  name: 'red_bin_3',
		  strokeStyle: 'darkgray',
		  fillStyle: "white",
		  strokeWidth: 3,
		  x: origin_x + 415, y: origin_y + 385,
		  width: 40,
		  height: 40,
		  rotate: 45,
		  click: function(layer) {   //move IR beacon to red bin 3
			if (begin_auto == false)
				{
					ir_location = 3;
					$('#field').animateLayer('red_ir_beacon', {
							x: origin_x + 415, y: origin_y + 385
						}, 0);
					$('#field').animateLayer('blue_ir_beacon', {
							x: origin_x + 185, y: origin_y + 215
						}, 0);
				}
		  }
		});
		
		//red bin 4
		$('#field').drawRect({
		  layer: true,
		  name: 'red_bin_4',
		  strokeStyle: 'darkgray',
		  fillStyle: "white",
		  strokeWidth: 3,
		  x: origin_x + 450, y: origin_y + 350,
		  width: 40,
		  height: 40,
		  rotate: 45,
		  click: function(layer) {   //move IR beacon to red bin 4
			if (begin_auto == false)
				{
					ir_location = 4;
					$('#field').animateLayer('red_ir_beacon', {
							x: origin_x + 450, y: origin_y + 350
						}, 0);
					$('#field').animateLayer('blue_ir_beacon', {
							x: origin_x + 150, y: origin_y + 250
						}, 0);
				}
		  }
		});
		
		
		//first red diagonal
		$('#field').drawLine({
		  layer: true,
		  name: 'first_red_diagonal',
		  strokeStyle: '#ff0000',
		  strokeWidth: 10,
		  x1: origin_x + field_body_side / (600/400), y1: field_body_side + 10,
		  x2: origin_x + field_body_side, y2: origin_y + field_body_side / (600/400)
		});
		
		
		////////////////////////////////////////////////////////////////FUNCTIONS FOR NXT////////////////////////////////////////////////////////////////
		
		function write_nxt(nxt_text, nxt_text_size)
		{
			//rewrite nxt text
			$('#field').setLayer('nxt_text', {
			  text: nxt_text,
			  fontSize : nxt_text_size
			})
			.drawLayers();
		}
		
		var next_step_okay = true;
		var prompt_counter = 0;
		//1 = start side, 2 = pause time, 3 = behind lind, 4 = safety
		//5 = color, 6 = ramp side, 7 = defensive, 8 = wait for start
		
		//var start_side = "N/A";
//		var pause_time = 0;
//		var behind_line = "N/A";
//		var safeties_on = "N/A";
//		var color = "N/A";
//		var ramp_side = "auto";
//		var defensive_ramp = "N/A";
//		var wfs = "N/A";
//		var ir_location = 1;
//		var heading = 0;
//		var bin_side;
//		var wall_side;
//		var touching_robot = false;
//		var moving_to_wall = false;
//		var tried_new = 0;
		
		
		//PRESET TESTING VARS 
		var start_side = "left";
		var pause_time = 1;
		var behind_line = true;
		var safeties_on = true;
		var color = "blue";
		var ramp_side = "auto";
		var defensive_ramp = true;
		var wfs = true;
		var ir_location = 1;
		var heading = 0;
		var bin_side;
		var wall_side;
		var touching_robot = false;
		var moving_to_wall = false;
		var tried_new = 0;
		
		//draw the testing button
//		$('#field').drawRect({
//		  layer: true,
//		  name: 'quick_start',
//		  strokeStyle: 'black',
//		  fillStyle: 'black',
//		  x: 50, y: 50,
//		  width: 40, height: 40,
//		  click: function(layer) {   
//				begin_auto = true;
//				write_nxt("IR Stick Down", 15);
//				time = 0;
//				setTimer();
//				robot_to_pendulum_line();//this function includes the pause time
//		  }
//		});
		
		var begin_auto = false;
		
		function write_var_set()
		{
			$('#variables').html('Variables Set:<br><b>Start Side</b>: '+start_side.toUpperCase()+'. <br><b>Pause Time</b>: '+pause_time+' SEC. <br><b>Behind Line</b>: '+behind_line.toString().toUpperCase()+'. <br><b>Safeties On</b>: '+safeties_on.toString().toUpperCase()+'. <br><b>Color</b>: '+color.toUpperCase()+'. <br><b>Ramp Side</b>: '+ramp_side.toUpperCase()+'. <br><b>Defensive Ramp</b>: '+defensive_ramp.toString().toUpperCase()+'. <br><b>Wait for Start</b>: '+wfs.toString().toUpperCase());
		}
		
		write_var_set();
		
		function set_text(nxt_textR, nxt_text_sizeR, next_step_okayR)
		{
			nxt_text = nxt_textR;
			nxt_text_size = nxt_text_sizeR;
			next_step_okay = next_step_okayR;
		}
		
		//function which runs when the middle nxt button is pressed
		function middle_clicked()
		{
			if (next_step_okay == true)
			{
				prompt_counter += 1;
			}
			
			if (prompt_counter == 1)//start side prompt
			{
				set_text("L<start side>R", 20, false); //can't continue until selection is made
			}
			else if (prompt_counter == 2)//pause time prompt
			{
				set_text("- Pause <-OK-> + Pause", 12, true); //can continue with default of 0 pause time
			}
			else if (prompt_counter == 3)//behind line
			{
				set_text("YES<behind?>NO", 15, false); //can't continue until selection is made
			}
			else if (prompt_counter == 4)//safeties
			{
				set_text("ON<safeties?>OFF", 15, false); //can't continue until selection is made
			}
			else if (prompt_counter == 5)//color
			{
				set_text("BLUE<choose>RED", 15, false); //can't continue until selection is made
			}
			else if (prompt_counter == 6)//ramp side
			{
				set_text("ramp:L<auto>R", 15, true); // can continue with default of auto ramp side
			}
			else if (prompt_counter == 7) //defensive ramp
			{
				set_text("YES<def ramp?>NO", 15, false); //can't continue until selection is made
			}
			else if (prompt_counter == 8) //wait for start
			{
				set_text("ON<WFS>OFF", 15, false); // can't continue until selection is made
			}
			else if (prompt_counter == 9) //auto is ready to begin
			{
				begin_auto = true;
				set_text("IR Stick Down", 15, true);
				time = 0;
				setTimer();
				robot_to_pendulum_line();//this function includes the pause time
			}
			//rewrite nxt text
			write_nxt(nxt_text, nxt_text_size);
			write_var_set();
		}
		
		function left_clicked()
		{
			if (prompt_counter == 1)//start side prompt
			{
				start_side = "left";
				nxt_text = "LEFT";
				nxt_text_size = 20;
			}
			else if (prompt_counter == 2 && pause_time >= 1)//pause time prompt and avoid negative pause time
			{
				pause_time -= 1;	
				nxt_text = pause_time + " sec";
				nxt_text_size = 24;
			}
			else if (prompt_counter == 3)//behind line prompt
			{
				behind_line = true;
				nxt_text = "YES";
				nxt_text_size = 24;
			}
			else if (prompt_counter == 4)//safeties
			{
				safeties_on = true;
				nxt_text = "ON";
				nxt_text_size = 24;
			}
			else if (prompt_counter == 5)//color
			{
				color = "blue";
				nxt_text = "BLUE";
				nxt_text_size = 24;
			}
			else if (prompt_counter == 6)//ramp side
			{
				ramp_side = "left";
				nxt_text = "LEFT";
				nxt_text_size = 24;
			}
			else if (prompt_counter == 7)//defensive ramp
			{
				defensive_ramp = true;
				nxt_text = "YES";
				nxt_text_size = 24;
			}
			else if (prompt_counter == 8)//wait for start
			{
				wfs = true;
				nxt_text = "ON";
				nxt_text_size = 24;
			}
			
			next_step_okay = true;
			write_nxt(nxt_text, nxt_text_size);
		}
		
		function right_clicked()
		{
			if (prompt_counter == 1)//start side prompt
			{
				start_side = "right";
				nxt_text = "RIGHT";
				nxt_text_size = 20;
			}
			else if (prompt_counter == 2 && pause_time < 30)//pause time prompt and cap at 30 seconds
			{
				pause_time += 1;	
				nxt_text = pause_time + " sec";
				nxt_text_size = 24;
			}
			else if (prompt_counter == 3)//behind line prompt
			{
				behind_line = false;
				nxt_text = "NO";
				nxt_text_size = 24;
			}
			else if (prompt_counter == 4)//safeties
			{
				safeties_on = false;
				nxt_text = "OFF";
				nxt_text_size = 24;
			}
			else if (prompt_counter == 5)//color
			{
				color = "red";
				nxt_text = "RED";
				nxt_text_size = 24;
			}
			else if (prompt_counter == 6)//ramp side
			{
				ramp_side = "right";
				nxt_text = "RIGHT";
				nxt_text_size = 24;
			}
			else if (prompt_counter == 7)//defensive ramp
			{
				defensive_ramp = false;
				nxt_text = "NO";
				nxt_text_size = 24;
			}
			else if (prompt_counter == 8)//wait for start
			{
				wfs = false;
				nxt_text = "OFF";
				nxt_text_size = 24;
			}
			
			next_step_okay = true;
			write_nxt(nxt_text, nxt_text_size);
		}
		
		
		
		
		////////////////////////////////////////////////////////////////ROBOT FUNCTIONS////////////////////////////////////////////////////////////////

		//draw IR beacon for blue side
		$('canvas').drawPolygon({
		  layer: true,
		  name: 'blue_ir_beacon',
		  fillStyle: 'green',
		  strokeStyle: 'green',
		  strokeWidth: 3,
		  x: origin_x + 255, y: origin_y + 145, y: origin_y + 145,
		  radius: 15,
		  sides: 3,
		  concavity: -0.5,
		  rotate: 180
		});
		
		//draw IR beacon for red side
		$('canvas').drawPolygon({
		  layer: true,
		  name: 'red_ir_beacon',
		  fillStyle: 'green',
		  strokeStyle: 'green',
		  strokeWidth: 3,
		  x: origin_x + 345, y: origin_y + 455,
		  radius: 15,
		  sides: 3,
		  concavity: -0.5,
		  rotate: 180
		});
		
		
		$('canvas').drawPolygon({
		  layer: true,
		  name: 'other_robot',
		  fillStyle: 'pink',
		  strokeStyle: 'pink',
		  strokeWidth: 3,
		  x: -1000, y: -1000,
		  radius: 50,
		  sides: 8
		});
		$('canvas').drawPolygon({
		  layer: true,
		  name: 'other_robot_final',
		  fillStyle: 'yellow',
		  strokeStyle: 'yellow',
		  strokeWidth: 3,
		  x: -1000, y: -1000,
		  radius: 50,
		  sides: 8
		});
		
		var robot_length = (18*field_body_side) / 144 ;//make length of robot (18 inches) in pixels proportional to field length
		
		//draw the robot
		$('#field').drawRect({
		  layer: true,
		  name: 'robot577',
		  draggable: true,
		  strokeStyle: 'black',
		  fillStyle: 'purple',
		  //x: 883, y: 549,
		  x: 406, y: 56,
		  width: robot_length, height: robot_length,
		  dblclick: function(layer) { 
				if (begin_auto == false)
				{
					heading += (45/2);  
					$('#field').animateLayer('robot577', {
						rotate: '+='+(45/2)
					}, 100);
					
					//write_nxt(heading, 20);
				}
		  },
		  click: function(layer){
				if (begin_auto == true)//make sure auto has started before simulating obstructions
				{
					if (continue_auto == true)
					{
						touching_robot = true;
						if (moving_to_wall == true)
						{	
							tried_new += 1;
							if (wall_side == 'left')
							{
								wall_side = 'right';
							}
							else if (wall_side == 'right')
							{
								wall_side = 'left';
							}
							
							
							$('#field').stopLayer('robot577',true);
							
							if (tried_new == 1 || tried_new == 2)
							{
								$('#field').setLayer('other_robot', {
								  x: layer.x, y:layer.y
								})
								move_to_wall();
							}
							else
							{
								$('#field').setLayer('other_robot_final', {
								  x: layer.x, y:layer.y
								})
								$('#field').stopLayer('robot577',true);
								$('#field').setLayer('robot577', {
							  		opacity: .5
								});
								write_nxt('End Auto', 20);
							}
						}
					}
				}
		  },
		  //dragstop: function(layer) {
//		    write_nxt(layer.x+' , '+layer.y, 15);
//		  }
		});
		
		
		function robot_to_pendulum_line()
		{
			if ((color == "blue" || color == "N/A") && start_side == "left")
			{
				center_pend_x = 517;
				center_pend_y = 139;
			}
		
			else if ((color == "blue" || color == "N/A") && start_side == "right")
			{
				center_pend_x = 482;
				center_pend_y = 177;
			}
			else if (color == "red" && start_side == "left")
			{
				center_pend_x = 780;
				center_pend_y = 483;
			}
			else if (color == "red" && start_side == "right")
			{
				center_pend_x = 819;
				center_pend_y = 444;
			}
			//waits for pause time length
			$('#field').delayLayer('robot577', (pause_time*1000));
			
			checkTouchStop();
			
			//this moves the robot to the center of the pendulum line
			$('#field').animateLayer('robot577', {
				x: center_pend_x, y: center_pend_y
			}, 3000, function(layer) {
			  // Callback function
				stopCheckStop();
			});
			
			if (continue_auto == true)
			{
				//this rotates the robot to align with the line
				$('#field').animateLayer('robot577', {
					width: robot_length
				}, 250, function(layer) {
				  // Callback function
				 
				  	if (heading == 45)
					{
						new_rot = "+="+0;
					}
					else if (heading > 45)
					{
						new_rot = "-="+(heading - 45);
					}
					else if (heading < 45)
					{
						new_rot = "+="+(45 - heading);
					}
				
				  write_nxt("Align Parallel to Line", 15);
				
				  $(this).animateLayer(layer, {
				    rotate: new_rot
				  }, 500, function()
					{
				  		write_nxt("Move to Beacon", 15);
						move_to_bin(ir_location);	
					});
				});
			}
			
		}
		
		function move_to_bin(ir_location)
		{
			if (ir_location == 1)
			{
				bin_side = "left";
				if (color == "blue")
				{
					move_to_x = 549;
					move_to_y = 105;
				}
				else if (color == "red")
				{
					move_to_x = 751;
					move_to_y = 514; 
				}
			}
			else if (ir_location == 2)
			{
				bin_side = "left";
				if (color == "blue")
				{
					move_to_x = 521;
					move_to_y = 136;
				}
				else if (color == "red")
				{
					move_to_x = 783;
					move_to_y = 481; 
				}
			}
			else if (ir_location == 3)
			{
				bin_side = "right";
				if (color == "blue")
				{
					move_to_x = 483;
					move_to_y = 173;
				}
				else if (color == "red")
				{
					move_to_x = 819;
					move_to_y = 446; 
				}
			}
			else if (ir_location == 4)
			{
				bin_side = "right";
				if (color == "blue")
				{
					move_to_x = 446;
					move_to_y = 210;
				}
				else if (color == "red")
				{
					move_to_x = 853;
					move_to_y = 410; 
				}
			}
			//have nxt display beacon direction relative to robot
			write_nxt("Beacon to "+bin_side, 15);
			
			//have robot move to the bin
			$('#field').animateLayer('robot577', {
				x: move_to_x, y: move_to_y
			}, 1500, function(){
			
				//this places a block in the middle of the IR bin
				$('#field').animateLayer(color+'_ir_beacon', {
					radius: 15
				}, 10, function(layer) {
				  	// Callback function
					
					//draw block
					$('#field').drawRect({
					  layer: true,
					  name: 'block',
					  strokeStyle: 'darkgray',
					  fillStyle: "yellow",
					  strokeWidth: 2,
					  x: layer.x, y: layer.y,
					  width: 20,
					  height: 20,
					  cornerRadius: 2
					});
					
				});
				
				write_nxt("Dropped Block", 15)
				
				
				move_to_wall();
			
			
			});
			
			
		}
		
		
		function move_to_wall()
		{
			write_nxt("Move to Wall", 15);
			if (tried_new == 0)
			{
				get_wall_side();
			}
			
			if (wall_side == "left" && color == "blue")
			{
				move_to_x = 608;
				move_to_y = 65;
			}
			else if (wall_side == "right" && color == "blue")
			{
				move_to_x = 406;
				move_to_y = 263;
			}
			else if (wall_side == "left" && color == "red")
			{
				move_to_x = 703;
				move_to_y = 556;
			}
			else if (wall_side == "right" && color == "red")
			{
				move_to_x = 897;
				move_to_y = 357;
			}
			
			moving_to_wall = true;
			
			//$('#testing').html('moving to wall ' + tried_new);
			
			if (tried_new == 0)
			{
				anim_time = 1500;
			}
			else
			{
				anim_time = 3000;
			}
			
			//have robot move to the wall
			$('#field').animateLayer('robot577', {
				x: move_to_x, y: move_to_y
			}, anim_time, function(layer){
				//callback function
				moving_to_wall = false;
				move_to_center_line(move_to_x, move_to_y);	
			});
		}
		
		//this function moves the robot defensively in increments
		function move_center_increment(move_to_x_dist, move_to_y_dist,orig_x, orig_y, final_x, final_y, side_ramp_x, side_ramp_y)
			{
				var current_x = orig_x;
				var current_y = orig_y;
				rot = 0;
				var keep_going = false;
				
				move_inc = setInterval(function()
					{	
						var rot_inc = 10;	
						
						var end_rot = 180;
						
						if (rot < end_rot)
						{
							$('#field').animateLayer('robot577', {
								rotate: '+='+rot_inc
							}, 25, function(layer){
								rot += rot_inc;
								current_x = layer.x;
								current_y = layer.y;
							});
						}
						
						if ((color == "blue" && current_x < final_x) || (color == "red" && current_x > final_x))
						{
							keep_going = true;
						}
						else
						{
							keep_going = false;
						}
						
						if (keep_going == true)
						{
							$('#field').animateLayer('robot577', {
								x: '+='+move_to_x_dist / 40,
								y: '+='+move_to_y_dist / 40
							}, 1, function(layer){
								//callback function
								current_x = layer.x;
								current_y = layer.y;
							});
						}
						
						else if (keep_going == false)//robot has finished getting to line position
						{
							clearInterval(move_inc);
							move_to_center_ramp(side_ramp_x, side_ramp_y);
						}	
												
					}, 100);
			}
		
		function get_wall_side()
		{
			if (ramp_side == "left" || (bin_side == "left" && ramp_side == "auto"))
			{
				wall_side = "left";
			}
			else if (ramp_side == "right" || (bin_side == "right" && ramp_side == "auto"))
			{
				wall_side = "right";
			}
		}
		
		function move_to_center_line_defensive(wall_x,wall_y)
			{
					write_nxt("DEFENSIVE to Line", 15)

				if (wall_side == "left" && color == "blue" && defensive_ramp == true)
				{
					move_to_x = 891;
					move_to_y = 130;
					side_ramp_x = 696;
					side_ramp_y = 347;
				}
				else if (wall_side == "right" && color == "blue" && defensive_ramp == true)
				{
					move_to_x = 468;
					move_to_y = 549;
					side_ramp_x = 696;
					side_ramp_y = 347;
				}
				else if (wall_side == "left" && color == "red" && defensive_ramp == true)
				{
					move_to_x = 417;
					move_to_y = 483;
					side_ramp_x = 606;
					side_ramp_y = 274;
				}
				else if (wall_side == "right" && color == "red" && defensive_ramp == true)
				{
					move_to_x = 816;
					move_to_y = 85;
					side_ramp_x = 606;
					side_ramp_y = 274;
				}
				
				move_to_x_dist = move_to_x - wall_x;
				move_to_y_dist = move_to_y - wall_y;
				//hyp = .5 * Math.sqrt( (move_to_x_dist - wall_x) * (move_to_x_dist - wall_x) + (move_to_y_dist - wall_y) * (move_to_y_dist - wall_y) );
				
				//increase x and y distances through these intervals. basically a dx and dy
				//x_interval = (move_to_x_dist)/10;
				//y_interval = (move_to_y_dist)/10;
				
				move_center_increment(move_to_x_dist, move_to_y_dist,wall_x, wall_y, move_to_x, move_to_y, side_ramp_x, side_ramp_y);
				
			}
		
		function move_to_center_line(wall_x, wall_y)
		{
			write_nxt("Move to Center Line", 15)
			if (wall_side == "left" && color == "blue" && defensive_ramp == false)
			{	
				move_to_x = 814;
				move_to_y = 84;
				side_ramp_x = 604;
				side_ramp_y = 271;
			}
			else if (wall_side == "right" && color == "blue" && defensive_ramp == false)
			{
				move_to_x = 417;
				move_to_y = 480;
				side_ramp_x = 604;
				side_ramp_y = 271;

			}
			else if (wall_side == "left" && color == "red" && defensive_ramp == false)
			{
				move_to_x = 472;
				move_to_y = 549;
				side_ramp_x = 692;
				side_ramp_y = 348;

			}
			else if (wall_side == "right" && color == "red" && defensive_ramp == false)
			{
				move_to_x = 885;
				move_to_y = 136;
				side_ramp_x = 692;
				side_ramp_y = 348;
			}
			
			
			//have robot move to the center line
			if (defensive_ramp == false)
			{
				$('#field').animateLayer('robot577', {
					x: move_to_x, y: move_to_y
				}, 2500, function(){
					//callback function
					
					move_to_center_ramp(side_ramp_x, side_ramp_y);
				});
			}
			else if (defensive_ramp == true)
			{
				move_to_center_line_defensive(wall_x, wall_y);
			}
		}
		
		function move_to_center_ramp(move_to_x, move_to_y)
		{
			write_nxt("Get to Ramp Hump", 15)
			//have robot move to the hump of the ramp
			$('#field').animateLayer('robot577', {
				x: move_to_x, y: move_to_y
			}, 2500, function(){
				//callback function
				write_nxt("Auto Success", 15);
				stopTime();
			});
		}

	}
);