//variables
//////////////////////////////////
var canvas, context;
var imgTiles, imgBomb, imgExplosion, imgEnemy;
var columns = 19, rows = 25;
var map = new Array(rows);
var player;
var step = 4, numBombs = 1, distanceExplosion = 3;
var keyDown = false, anim = false;
var masBombs =[];
var masEnemies = [];
var timerBombs, timerEnemies;
//////////////////////////////////
function Player(x,y,imgPlayer)
{
	this.x = x;
    this.y = y;
	this.imgPlayer = imgPlayer;
    this.gameOv = false;
    this.framePlayer = 0;
    this.direction = 1;
    this.drawPlayer = function ()
    {
        context.drawImage(this.imgPlayer,this.framePlayer*32,this.direction*32,32,32,this.x,this.y,32,32);
    }
}

function AIEnemy()
{
    for(var i=0; i < masEnemies.length; i++)
    {
        var prevDirection = masEnemies[i].direction;
        var freeDir = [];
        switch(masEnemies[i].direction)
        {
            case 0://Up
                if(masEnemies[i].y-2 >= 32 && map[(masEnemies[i].x/32).toFixed()][((masEnemies[i].y-16)/32).toFixed()] == 0 && masEnemies[i].x%32 == 0)
                {
                    masEnemies[i].y -= 2;
                }
                else
                {
                    freeDir[0] = 1;
                    if(map[((masEnemies[i].x+16)/32).toFixed()][((masEnemies[i].y)/32).toFixed()] == 0)
                        freeDir[1] = 0;
                    else
                        freeDir[1] = 1;
                    if(map[((masEnemies[i].x-16)/32).toFixed()][((masEnemies[i].y)/32).toFixed()] == 0)
                        freeDir[3] = 0;
                    else
                        freeDir[3] = 1;
                    if(map[(masEnemies[i].x/32).toFixed()][((masEnemies[i].y+16)/32).toFixed()] == 0)
                        freeDir[2] = 0;
                    else
                        freeDir[2] = 1;

                    do
                    {
                        var rand = Math.floor((Math.random()*4));
                        if(freeDir[rand] == 0)
                            masEnemies[i].direction = rand;
                    } while(freeDir[rand] != 0);
                    //prevDirection = masEnemies[i].direction;
                   // masEnemies[i].direction =  Math.floor((Math.random()*4));
                }
                break;
            case 1://Right
                if(masEnemies[i].x+32+2 <= 768 && map[((masEnemies[i].x+16)/32).toFixed()][(masEnemies[i].y/32).toFixed()] == 0 && masEnemies[i].y%32 == 0)
                {
                    masEnemies[i].x += 2;
                }
                else
                {
                    freeDir[1] = 1;
                    if(map[((masEnemies[i].x)/32).toFixed()][((masEnemies[i].y-16)/32).toFixed()] == 0)
                        freeDir[0] = 0;
                    else
                        freeDir[0] = 1;
                    if(map[((masEnemies[i].x-16)/32).toFixed()][((masEnemies[i].y)/32).toFixed()] == 0)
                        freeDir[3] = 0;
                    else
                        freeDir[3] = 1;
                    if(map[(masEnemies[i].x/32).toFixed()][((masEnemies[i].y+16)/32).toFixed()] == 0)
                        freeDir[2] = 0;
                    else
                        freeDir[2] = 1;

                    do
                    {
                        var rand = Math.floor((Math.random()*4));
                        if(freeDir[rand] == 0)
                            masEnemies[i].direction = rand;
                    } while(freeDir[rand] != 0);
                }

                break;
            case 2://Down
                if(masEnemies[i].y <= 576 && map[(masEnemies[i].x/32).toFixed()][((masEnemies[i].y+16)/32).toFixed()] == 0 && masEnemies[i].x%32 == 0)
                {
                    masEnemies[i].y += 2;
                }
                else
                {
                    freeDir[2] = 1;
                    if(map[((masEnemies[i].x)/32).toFixed()][((masEnemies[i].y-16)/32).toFixed()] == 0)
                        freeDir[0] = 0;
                    else
                        freeDir[0] = 1;
                    if(map[((masEnemies[i].x-16)/32).toFixed()][((masEnemies[i].y)/32).toFixed()] == 0)
                        freeDir[3] = 0;
                    else
                        freeDir[3] = 1;
                    if(map[((masEnemies[i].x+16)/32).toFixed()][((masEnemies[i].y)/32).toFixed()] == 0)
                        freeDir[1] = 0;
                    else
                        freeDir[1] = 1;

                    do
                    {
                        var rand = Math.floor((Math.random()*4));
                        if(freeDir[rand] == 0)
                            masEnemies[i].direction = rand;
                    } while(freeDir[rand] != 0);
                }

                break;
            case 3://Left
                if(masEnemies[i].x-2 >= 32 && map[((masEnemies[i].x-16)/32).toFixed()][(masEnemies[i].y/32).toFixed()] == 0 && masEnemies[i].y%32 == 0)
                {
                    masEnemies[i].x -= 2;
                }
                else
                {
                    freeDir[3] = 1;
                    if(map[((masEnemies[i].x)/32).toFixed()][((masEnemies[i].y-16)/32).toFixed()] == 0)
                        freeDir[0] = 0;
                    else
                        freeDir[0] = 1;
                    if(map[((masEnemies[i].x)/32).toFixed()][((masEnemies[i].y+16)/32).toFixed()] == 0)
                        freeDir[2] = 0;
                    else
                        freeDir[2] = 1;
                    if(map[((masEnemies[i].x+16)/32).toFixed()][((masEnemies[i].y)/32).toFixed()] == 0)
                        freeDir[1] = 0;
                    else
                        freeDir[1] = 1;

                    do
                    {
                        var rand = Math.floor((Math.random()*4));
                        if(freeDir[rand] == 0)
                            masEnemies[i].direction = rand;
                    } while(freeDir[rand] != 0);
                }
                break;
        }
    }
}

function CreateEnemies()
{
    var ex;
    var ey;
    var same = true;
    for(var i=0; i < 3; i++)
    {
        do{
            ex = Math.floor((Math.random()*23)+1);
            ey = Math.floor((Math.random()*17)+1);

            for(var j=0; j < masEnemies.length; j++)
            {
                if(masEnemies.length != 0)
                {
                    if(masEnemies[j].x == ex && masEnemies[j].y == ey)
                        same = false;
                }
            }
            if((ex==1 && ey ==1) | (ex==1 && ey==2) | (ex==2 && ey==1))
                same = false;

        } while(map[ex][ey] != 0 && same);
        masEnemies.push(new Player(ex*32,ey*32,imgEnemy));
    }
}



function Bomb(x, y, frameBomb)
{
    this.frameBomb = frameBomb;
    this.x = x;
    this.y = y;
    var distToBrickRight;
    var distToBrickLeft;
    var distToBrickDown;
    var distToBrickUp;

    for(var i=1; i <= distanceExplosion; i++)
    {
        if(map[this.x/32+i][this.y/32] == 1 && distToBrickRight == undefined)
            distToBrickRight = i;

        if(this.x/32-i >= 0)
        {
            if(map[this.x/32-i][this.y/32] == 1 && distToBrickLeft == undefined)
                distToBrickLeft = i;
        }
        else if(distToBrickLeft == undefined)
                distToBrickLeft = distanceExplosion;

        if(map[this.x/32][this.y/32+i] == 1 && distToBrickDown == undefined)
            distToBrickDown = i;


        if(map[this.x/32][this.y/32-i] == 1 && distToBrickUp == undefined)
            distToBrickUp = i;
    }
    if(distToBrickRight == undefined)
        distToBrickRight = distanceExplosion;
    if(distToBrickLeft == undefined)
        distToBrickLeft = distanceExplosion;
    if(distToBrickDown == undefined)
        distToBrickDown = distanceExplosion;
    if(distToBrickUp == undefined)
        distToBrickUp = distanceExplosion;

    this.drawBomb = function()
    {
        context.drawImage(imgBomb, 0, this.frameBomb*32, 32,32, this.x, this.y,32,32);
    }
    this.Explosion = function()
    {
		var osn = true;
		var dist = 1;
        var right = true;
        var left = true;
        var down = true;
        var up = true;

        for(var i=0; i < distanceExplosion; i++)
        {
            //center explosion
			if(osn)
			{
				context.drawImage(imgExplosion, 0,0, 32,32,this.x, this.y, 32,32);
			}

                //right
                if(map[this.x/32+dist][this.y/32] != 2 && map[this.x/32+(dist-1)][this.y/32] != 2 && right == true)
                {
                    if(distToBrickRight == dist)
                    {
                        context.drawImage(imgExplosion, 32,32, 32,32,this.x +(dist*32), this.y, 32,32);
                        right = false;
                        map[this.x/32+dist][this.y/32] = 0;
                        if(player.x >= this.x && (player.x/32).toFixed()*32 <= this.x+(dist*32) && (player.y/32).toFixed()*32 == this.y)
                            player.gameOv = true;

                        for(var k=0;k < masBombs.length; k++)
                        {
                            if(masBombs[k].x > this.x && (masBombs[k].x/32).toFixed()*32 < this.x+(dist*32) && (masBombs[k].y/32).toFixed()*32 == this.y)
                                masBombs[k].frameBomb = 15;
                        }

                        for(var k=0; k<masEnemies.length; k++)
                        {
                            if(masEnemies[k].x >= this.x && (masEnemies[k].x/32).toFixed()*32 <= this.x+(dist*32) && (masEnemies[k].y/32).toFixed()*32 == this.y)
                                masEnemies[k].gameOv = true;
                        }
                    }
                    else if(right && distToBrickRight != dist)
                        {
                            context.drawImage(imgExplosion, 32,0, 32,32,this.x+(dist*32), this.y, 32,32);
                            map[this.x/32+dist][this.y/32] = 0;
                            if(player.x >= this.x && (player.x/32).toFixed()*32 <= this.x+(dist*32) && (player.y/32).toFixed()*32 == this.y)
                                player.gameOv = true;
                            for(var k=0;k < masBombs.length; k++)
                            {
                                if(masBombs[k].x > this.x && (masBombs[k].x/32).toFixed()*32 < this.x+(dist*32) && (masBombs[k].y/32).toFixed()*32 == this.y)
                                    masBombs[k].frameBomb = 15;
                            }
                            for(var k=0; k<masEnemies.length; k++)
                            {
                                if(masEnemies[k].x >= this.x && (masEnemies[k].x/32).toFixed()*32 <= this.x+(dist*32) && (masEnemies[k].y/32).toFixed()*32 == this.y)
                                    masEnemies[k].gameOv = true;
                            }
                        }
                }

                //left
                if(this.x/32-dist > 0)
                {
                    if(map[this.x/32-dist][this.y/32] != 2 && map[this.x/32-(dist-1)][this.y/32] != 2)
                    {
                        if(distToBrickLeft == dist)
                        {
                            context.drawImage(imgExplosion, 96,32, 32,32,this.x-(dist*32), this.y, 32,32);
                            left = false;
                            map[this.x/32-dist][this.y/32] = 0;
                            if(player.x <= this.x && (player.x/32).toFixed()*32 <= this.x-(dist*32) && (player.y/32).toFixed()*32 == this.y)
                                player.gameOv = true;

                            for(var k=0;k < masBombs.length; k++)
                            {
                                if(masBombs[k].x < this.x && (masBombs[k].x/32).toFixed()*32 <= this.x-(dist*32) && (masBombs[k].y/32).toFixed()*32 == this.y)
                                    masBombs[k].frameBomb = 15;
                            }

                            for(var k=0; k<masEnemies.length; k++)
                            {
                                if(masEnemies[k].x <= this.x && (masEnemies[k].x/32).toFixed()*32 <= this.x-(dist*32) && (masEnemies[k].y/32).toFixed()*32 == this.y)
                                    masEnemies[k].gameOv = true;
                            }
                        }
                        else if(left && distToBrickLeft != dist)
                            {
                                context.drawImage(imgExplosion, 32,0, 32,32,this.x-(dist*32), this.y, 32,32);
                                map[this.x/32-dist][this.y/32] = 0;
                                if(player.x <= this.x && (player.x/32).toFixed()*32 <= this.x-(dist*32) && (player.y/32).toFixed()*32 == this.y)
                                    player.gameOv = true;

                                for(var k=0;k < masBombs.length; k++)
                                {
                                    if(masBombs[k].x < this.x && (masBombs[k].x/32).toFixed()*32 <= this.x-(dist*32) && (masBombs[k].y/32).toFixed()*32 == this.y)
                                        masBombs[k].frameBomb = 15;
                                }
                                for(var k=0; k<masEnemies.length; k++)
                                {
                                    if(masEnemies[k].x <= this.x && (masEnemies[k].x/32).toFixed()*32 <= this.x-(dist*32) && (masEnemies[k].y/32).toFixed()*32 == this.y)
                                        masEnemies[k].gameOv = true;
                                }
                            }
                    }
                }

                //down
                if(map[this.x/32][this.y/32+dist] != 2 && map[this.x/32][this.y/32+(dist-1)] != 2)
                {
                    if(distToBrickDown == dist)
                    {
                        context.drawImage(imgExplosion, 64,32, 32,32,this.x, this.y+(dist*32), 32,32);
                        down = false;
                        map[this.x/32][this.y/32+dist] = 0;
                        if(player.y >= this.y && (player.y/32).toFixed()*32 <= this.y+(dist*32) && (player.x/32).toFixed()*32 == this.x)
                            player.gameOv = true;

                        for(var k=0; k<masBombs.length; k++)
                        {
                            if(masBombs[k].y > this.y && (masBombs[k].y/32).toFixed()*32 <= this.y+(dist*32) && (masBombs[k].x/32).toFixed()*32 == this.x)
                                masBombs[k].frameBomb = 15;
                        }

                        for(var k=0; k<masEnemies.length; k++)
                        {
                            if(masEnemies[k].y >= this.y && (masEnemies[k].y/32).toFixed()*32 <= this.y+(dist*32) && (masEnemies[k].x/32).toFixed()*32 == this.x)
                                masEnemies[k].gameOv = true;
                        }
                    }
                    else if(down && distToBrickDown != dist)
                        {
                            context.drawImage(imgExplosion, 64,0, 32,32,this.x, this.y+(dist*32), 32,32);
                            map[this.x/32][this.y/32+dist] = 0;
                            if(player.y >= this.y && (player.y/32).toFixed()*32 <= this.y+(dist*32) && (player.x/32).toFixed()*32 == this.x)
                                player.gameOv = true;

                            for(var k=0; k<masBombs.length; k++)
                            {
                                if(masBombs[k].y > this.y && (masBombs[k].y/32).toFixed()*32 <= this.y+(dist*32) && (masBombs[k].x/32).toFixed()*32 == this.x)
                                    masBombs[k].frameBomb = 15;
                            }
                            for(var k=0; k<masEnemies.length; k++)
                            {
                                if(masEnemies[k].y >= this.y && (masEnemies[k].y/32).toFixed()*32 <= this.y+(dist*32) && (masEnemies[k].x/32).toFixed()*32 == this.x)
                                    masEnemies[k].gameOv = true;
                            }
                        }
                }
                //up
                if(map[this.x/32][this.y/32-dist] != 2 && map[this.x/32][this.y/32-(dist-1)] != 2)
                {
                    if(distToBrickUp == dist)
                    {
                        context.drawImage(imgExplosion, 0,32, 32,32,this.x, this.y-(dist*32), 32,32);
                        up = false;
                        map[this.x/32][this.y/32-dist] = 0;
                        if(player.y <= this.y && (player.y/32).toFixed()*32 >= this.y-(dist*32) && (player.x/32).toFixed()*32 == this.x)
                            player.gameOv = true;


                        for(var k=0; k<masBombs.length; k++)
                        {
                            if(masBombs[k].y < this.y && (masBombs[k].y/32).toFixed()*32 >= this.y-(dist*32) && (masBombs[k].x/32).toFixed()*32 == this.x)
                                masBombs[k].frameBomb = 15;
                        }
                        for(var k=0; k<masEnemies.length; k++)
                        {
                            if(masEnemies[k].y <= this.y && (masEnemies[k].y/32).toFixed()*32 >= this.y-(dist*32) && (masEnemies[k].x/32).toFixed()*32 == this.x)
                                masEnemies[k].gameOv = true;
                        }
                    }
                    else if(up && distToBrickUp != dist)
                        {
                            context.drawImage(imgExplosion, 64,0, 32,32,this.x, this.y-(dist*32), 32,32);
                            map[this.x/32][this.y/32-dist] = 0;
                            if(player.y <= this.y && (player.y/32).toFixed()*32 >= this.y-(dist*32) && (player.x/32).toFixed()*32 == this.x)
                                player.gameOv = true;

                            for(var k=0; k<masBombs.length; k++)
                            {
                                if(masBombs[k].y < this.y && (masBombs[k].y/32).toFixed()*32 >= this.y-(dist*32) && (masBombs[k].x/32).toFixed()*32 == this.x)
                                    masBombs[k].frameBomb = 15;
                            }
                            for(var k=0; k<masEnemies.length; k++)
                            {
                                if(masEnemies[k].y <= this.y && (masEnemies[k].y/32).toFixed()*32 >= this.y-(dist*32) && (masEnemies[k].x/32).toFixed()*32 == this.x)
                                    masEnemies[k].gameOv = true;
                            }
                        }
                }
            dist++;
            osn = false;
        }
    }
}

function GameOver()
{
    alert("GameOver!!!");
}

function CreateMap()
{
    for(var i=0; i<rows+1;i++)
    {
        map[i] = new Array(rows);
        for(var j = 0; j<columns+1;j++)
        {
            if(i == 0 | j == 0 | i == rows-1 | j == columns-1)
            {
                map[i][j] = 2;
            }
            else
            {
                if((i+1)%2 != 0 & (j+1)%2 !=0)
                    map[i][j] = 2;
                else
                {
                    if(Math.floor((Math.random()*6)+1) < 4)
                        map[i][j] = 1;
                    else
                        map[i][j] = 0;
                }
            }
        }
    }
    map[1][1] = 0;
    map[1][2] = 0;
    map[2][1] = 0;
}

function DrawMap()
{
    for(var i=0; i<rows;i++)
    {
        for(var j = 0; j<columns;j++)
        {
              switch(map[i][j])
              {
                  case 0:
                      context.drawImage(imgTiles,0,0,32,32,i*32,j*32,32,32);
                      break;
                  case 1:
                      context.drawImage(imgTiles,64,0,32,32,i*32,j*32,32,32);
                      break;
                  case 2:
                      context.drawImage(imgTiles,32,0,32,32,i*32,j*32,32,32);
                      break;
                  case 3:
                      context.drawImage(imgTiles,0,0,32,32,i*32,j*32,32,32);
                      break;
              }
        }
    }
}
//functions drawind
/////////////////////////////////////////////
function clear() 
{
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

function drawScene() 
{ 
    //clear();
	context.clearRect(player.x, player.y, 32, 32);
    //context.beginPath();
	//context.fillStyle = 'yellow';

    DrawMap();
    player.drawPlayer();

	//context.closePath();
    //context.fill();
    //context.lineWidth = 1;
    //context.strokeStyle = 'gray';
    //context.stroke();


	if(anim)
	{
        player.framePlayer += 1;
		if(player.framePlayer >7)
            player.framePlayer = 0;
	
	}

    AIEnemy();

    for(var i = 0;i<masBombs.length;i++)
    {
        if(masBombs[i].frameBomb>=13)
            masBombs[i].Explosion();
        else
            masBombs[i].drawBomb();

    }

    for(var i=0; i < masEnemies.length; i++)
    {
        masEnemies[i].drawPlayer();

        if(masEnemies[i].x == player.x && masEnemies[i].y)
            GameOver();
    }

	if(keyDown)
	{
		switch(player.direction)
		{
			case 0://Up
				if(player.y-step >= 32 && map[(player.x/32).toFixed()][((player.y-16)/32).toFixed()] == 0 && player.x%32 == 0  || map[((player.x)/32).toFixed()][(player.y/32).toFixed()] == 3 && map[((player.x)/32).toFixed()][(player.y/32-1).toFixed()] != 2 && map[((player.x)/32).toFixed()][(player.y/32-1).toFixed()] != 1)
					player.y -= step;
				else
				{
                    if((Math.floor(player.x/32) < (player.x+20)/32) && (Math.floor((player.x/32)%2) == 0))
                    {
                        player.x += step;
                    }
                    if((Math.ceil(player.x/32) > ((player.x+12)/32)) && (((player.x/32)%2) != 0))
                    {
                        player.x -= step;
                    }
				}
				break;
			case 1://Right
				if(player.x+32+step <= 768 && map[((player.x+16)/32).toFixed()][(player.y/32).toFixed()] == 0 && player.y%32 == 0 || map[((player.x)/32).toFixed()][(player.y/32).toFixed()] == 3 && map[((player.x)/32+1).toFixed()][(player.y/32).toFixed()] != 2 && map[((player.x)/32+1).toFixed()][(player.y/32).toFixed()] != 1)
					player.x += step;
				else
				{
					if((Math.floor(player.y/32) < (player.y+20)/32) && (Math.floor((player.y/32)%2) == 0))
					{
						player.y += step;
					}
					if((Math.ceil(player.y/32) > ((player.y+12)/32)) && (((player.y/32)%2) != 0))
					{
						player.y -= step;
					}
				}
				break;
			case 2://Down
				if(player.y <= 576 && map[(player.x/32).toFixed()][((player.y+16)/32).toFixed()] == 0 && player.x%32 == 0 || map[((player.x)/32).toFixed()][(player.y/32).toFixed()] == 3 && map[((player.x)/32).toFixed()][(player.y/32+1).toFixed()] != 2 && map[((player.x)/32).toFixed()][(player.y/32+1).toFixed()] != 1)
					player.y += step;
				else
				{
                    if((Math.floor(player.x/32) < (player.x+20)/32) && (Math.floor((player.x/32)%2) == 0))
                    {
                        player.x += step;
                    }
                    if((Math.ceil(player.x/32) > ((player.x+12)/32)) && (((player.x/32)%2) != 0))
                    {
                        player.x -= step;
                    }
				}
				break;
			case 3://Left
				if(player.x-step >= 32 && map[((player.x-16)/32).toFixed()][(player.y/32).toFixed()] == 0 && player.y%32 == 0 || map[((player.x)/32).toFixed()][(player.y/32).toFixed()] == 3 && map[((player.x)/32-1).toFixed()][(player.y/32).toFixed()] != 2 && map[((player.x)/32-1).toFixed()][(player.y/32).toFixed()] != 1)
					player.x -= step;
				else
				{
                    if((Math.floor(player.y/32) < (player.y+20)/32) && (Math.floor((player.y/32)%2) == 0))
                    {
                        player.y += step;
                    }
                    if((Math.ceil(player.y/32) > ((player.y+12)/32)) && (((player.y/32)%2) != 0))
                    {
                        player.y -= step;
                    }
				}
				break;
		}
	}
}

//Initilizing
//////////////////////////////////////////////////
$(function()
{
	canvas = document.getElementById('scene');
    context = canvas.getContext('2d');
	
	context.font = '40pt arial';

    imgTiles = new Image();
    imgTiles.src = "images/tileset.png";

    imgBomb = new Image();
    imgBomb.src = "images/bomb32.png";

    imgExplosion = new Image();
    imgExplosion.src = "images/explosion.png";

    var imgP = new Image();
    imgP.src = "images/player.png";

    imgEnemy = new Image();
    imgEnemy.src = "images/bender32.png";


    player = new Player(32,32, imgP);

	CreateMap();
    CreateEnemies();

	$(window).keydown(function(event)
	{
		switch(event.keyCode)
		{
			case 38://Up key
                player.direction = 0;
				keyDown = true;
				anim = true;
				break;
			case 40://Down key
                player.direction = 2;
				keyDown = true;
				anim = true;
				break;
			case 37://Left key
                player.direction = 3;
				keyDown = true;
				anim = true;
				break;
			case 39://Right key
                player.direction = 1;
				keyDown = true;
				anim = true;
				break;
			case 32://Space
                masBombs.push(new Bomb((player.x/32).toFixed()*32, (player.y/32).toFixed()*32, 0));
                map[(player.x/32).toFixed()][(player.y/32).toFixed()] = 3;
				break;
		}		
	});
	
	$(window).keyup(function(event)
	{
		switch(event.keyCode)
		{
			case 38://Up key
				keyDown = false;
				anim = false;
				break;
			case 40://Down key
				keyDown = false;
				anim = false;
				break;
			case 37://Left key
				keyDown = false;
				anim = false;
				break;
			case 39://Right key
				keyDown = false;
				anim = false;
				break;
		}		
	});

	window.setInterval(drawScene, 30);

    timerBombs = setInterval(function()
    {
        for(var i=0; i<masBombs.length; i++)
        {
            masBombs[i].frameBomb +=1;
            if(masBombs[i].frameBomb > 15)
            {
                map[masBombs[i].x/32][masBombs[i].y/32] = 0;
                masBombs.splice(i,1);
                if(player.gameOv)
                {
                    GameOver();
                    player.gameOv = false;
                }
            }
        }
    },250) ;

    timerEnemies = setInterval(function()
    {
        for(var i=0; i < masEnemies.length; i++)
        {
            var maxFrame;
            if(masEnemies[i].direction == 1 || masEnemies[i].direction == 3)
                maxFrame = 7;
            else
                maxFrame = 4;
            masEnemies[i].framePlayer += 1;
            if(masEnemies[i].framePlayer > maxFrame)
            {
                masEnemies[i].framePlayer = 0;
                if(masEnemies[i].gameOv == true)
                {
                    masEnemies.splice(i,1);
                }
            }
        }
    },80)

});