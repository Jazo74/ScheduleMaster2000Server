using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ScheduleMaster2000Server.Baseclasses;
using ScheduleMaster2000Server.Services;

namespace ScheduleMaster2000Server.Controllers
{
    //[EnableCors("ControllerPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : Controller
    {
        IDB_Users ds = new DB_Users();
        I_Logger dbLogger = new DBLogger();

        [HttpPost("Login", Name = "Login")]
        public async Task<ActionResult> Login([FromForm] string userId, [FromForm] string password)
        {
            User user = ds.GetUser(userId);
            string Password = user.Password;
            if (Password == password)
            {
                var claims = new List<Claim> { new Claim(ClaimTypes.Email, userId) };
                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                var authProperties = new AuthenticationProperties
                {
                    //AllowRefresh = <bool>,
                    // Refreshing the authentication session should be allowed.

                    //ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(10),
                    // The time at which the authentication ticket expires. A 
                    // value set here overrides the ExpireTimeSpan option of 
                    // CookieAuthenticationOptions set with AddCookie.

                    //IsPersistent = true,
                    // Whether the authentication session is persisted across 
                    // multiple requests. When used with cookies, controls
                    // whether the cookie's lifetime is absolute (matching the
                    // lifetime of the authentication ticket) or session-based.

                    //IssuedUtc = <DateTimeOffset>,
                    // The time at which the authentication ticket was issued.

                    //RedirectUri = <string>
                    // The full path or absolute URI to be used as an http 
                    // redirect response value.
                };
                await HttpContext.SignInAsync(
                    CookieAuthenticationDefaults.AuthenticationScheme,
                    new ClaimsPrincipal(claimsIdentity),
                    authProperties);

                string type = this.Request.Method;
                string userID = userId;
                string source = this.Request.Path;
                string param1 = "userId = " + userId;
                string param2 = "password = " + password;
                string param3 = "none";
                dbLogger.Log(userID, type, source, param1, param2, param3);

                user.Password = "";
                return Json(user);
            } else
            {
                string type = this.Request.Method;
                string userID = userId;
                string source = this.Request.Path;
                string param1 = "userId = " + userId;
                string param2 = "password = " + password;
                string param3 = "none";
                dbLogger.Log(userID, type, source, param1, param2, param3);

                user.UserId = "fakeuser@fakeuser.com";
                return Json(user);
            }
        }

        // GET: api/Users/Logout
        [HttpGet]
        [Authorize]
        [HttpGet("Logout", Name = "Logout")]
        public async void Logout()
        {
            string type = this.Request.Method;
            string userID = HttpContext.User.FindFirstValue(ClaimTypes.Email);
            string source = this.Request.Path;
            string param1 = "none";
            string param2 = "none";
            string param3 = "none";
            dbLogger.Log(userID, type, source, param1, param2, param3);

            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            //return RedirectToAction("Index", "Home");
        }

        [HttpPost("Register", Name = "Register")]
        public void Register([FromForm] string nickName, [FromForm] string userId, [FromForm] string password)
        {
            string type = this.Request.Method;
            string userID = HttpContext.User.FindFirstValue(ClaimTypes.Email);
            string source = this.Request.Path;
            string param1 = "nickName = " + nickName;
            string param2 = "userId = " + userId;
            string param3 = "password = " + password;
            dbLogger.Log(userID, type, source, param1, param2, param3);

            if (!ds.UserAlreadyExists(userId))
            {
                ds.AddUser(userId, nickName, password);
            }
        }
    }
}