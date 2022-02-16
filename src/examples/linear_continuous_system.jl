# ## [Linear Time Continuous System](@id linear_continuous)
# 
# Similar to the [`linear time discrete example`](@ref linear_discrete), we will now estimate a linear time continuous system. 
# We simulate the correspoding system using `OrdinaryDiffEq.jl` and generate a [`ContinuousDataDrivenProblem`](@ref DataDrivenProblem) from the simulated data.

using DataDrivenDiffEq
using ModelingToolkit
using LinearAlgebra
using OrdinaryDiffEq
using Plots #md

A = [-0.9 0.2; 0.0 -0.2]
u0 = [10.0; -10.0]
tspan = (0.0, 10.0)

f(u,p,t) = A*u

sys = ODEProblem(f, u0, tspan)
sol = solve(sys, Tsit5(), saveat = 0.05);

# We could use the `DESolution` to define our problem, but here we want to use the data for didactic purposes.
# For a [`ContinuousDataDrivenProblem`](@ref DataDrivenProblem), we need either the state trajectory and the timepoints or the state trajectory and its derivate.

X = Array(sol) # Collect the states
t = sol.t # Collect the time points
DX = Array(sol(t, Val{1})) # Collect the time derivative from the solution's interpolation

prob = ContinuousDataDrivenProblem(X, t)

# And plot the problems data.

plot(prob) #md

# We can see that the derivative has been automatically added via a [`collocation`](@ref) method, which defaults to a `LinearInterpolation`. 
# We can do a visual check and compare our derivatives

#md scatter(t, DX', label = ["Solution" nothing], color = :red, legend = :bottomright) 
#md plot!(t, prob.DX', label = ["Linear Interpolation" nothing], color = :black)

# Since we have a linear system, we can use `gDMD`, which approximates the generator of the dynamics

res = solve(prob, DMDSVD(), digits = 1) #md 
println(res) # hide

# !info 
# We see that the system has been recovered correctly, indicated by the small error and high AIC score of the result. We can confirm this by looking at the resulting [`Basis`](@ref)

system = result(res) #md 
println(system) # hide

# And also plot the prediction of the recovered dynamics

plot(res) #md

# Or a have a look at the metrics of the result

metrics(res) #md 

# And check the parameters of the result or the generator of the system

parameters(res)
Matrix(generator(system))

# to see that the operator is slightly off, but within expectations. 
# In a real example, this could have many reasons, e.g. noisy data, insufficient time samples or missing states.

# Sticking to the same procedure as earlier, we now use a linear sparse regression to solve the problem

using ModelingToolkit

@parameters t
@variables x[1:2](t)

basis = Basis(x, x, independent_variable = t, name = :LinearBasis)

# Afterwards, we simply `solve` the already defined problem with our `Basis` and a `SparseOptimizer`

sparse_res = solve(prob, basis, STLSQ())
#md println(sparse_res) #hide

# Which holds the same equations
sparse_system = result(sparse_res)
#md println(sparse_system) #hide

# Again, we can have a look at the result

#md plot(
#md     plot(prob), plot(sparse_res), layout = (1,2)
#md )

# Both results can be converted into an `ODESystem`

@named sys = ODESystem(equations(sparse_system), get_iv(sparse_system),states(sparse_system), parameters(sparse_system))

# And simulated using `OrdinaryDiffEq.jl` using the (known) initial conditions and the parameter mapping of the estimation.

x0 = [x[1] => u0[1], x[2] => u0[2]]
ps = parameter_map(sparse_res)

ode_prob = ODEProblem(sys, x0, tspan, ps)
estimate = solve(ode_prob, Tsit5(), saveat = prob.t)

# And look at the result
#md plot(sol, color = :black)
#md plot!(estimate, color = :red, linestyle = :dash)

#!md ## Test the result
#!md for r_ in [res, sparse_res] 
#!md     m = metrics(r_) 
#!md     @test all(m[:L₂] .<= 5e-10) 
#!md     @test all(m[:AIC] .>= 1e3) 
#!md     @test all(m[:R²] .>= 0.97) 
#!md end 
#!md @test Array(sol) ≈ Array(estimate) 

#md # ### [Copy-Pasteable Code](@id linear_continuous_copy_paste)
#md #
#md # ```julia
#md # @__CODE__
#md # ```